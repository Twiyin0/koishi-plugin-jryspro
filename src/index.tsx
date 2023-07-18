import { Context, Schema, Random } from 'koishi'
import { } from '@koishijs/plugin-rate-limit'
import { jrysJson } from './jrys'
import { pathToFileURL } from 'url'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'

export const name = 'jryspro'

export const usage = `
## 更新插件前请停止运行插件
插件配置项可能会有改动，不停止插件直接更新可能会导致koishi炸掉  

## 使用说明

> 如果你无法使用此插件，请检查  
> - 1. (使用命令时无反应，报错等)请检查指令是否有冲突或者是否正确安装puppeteer  
> - 2. 提示“发生未知错误”可能是没有获取到群友的uid，需要在数据库内刷新一下
> - 3. “数据出错”之类的提示不是本插件的提示，可能你装了其他插件
> - 4. 启用不了插件。请检查koishi版本，puppeteer版本等是否再兼容范围内，或重启koishi，删除此插件依赖再尝试重装

随机文件夹内图片时请注意路径\`C:user/path/to/\`不要把后面的/忘了   

## api说明
* api url以 #e# 结尾可以在末尾添加更新时间戳(例子后面等价的数字为当前时间戳)  
* 例: https://api.example.com/img?#e#  ==等价于== https://api.example.com/img?271878  
* 例: https://api.example.com/img?type=acc&v=#e#  ==等价于== https://api.example.com/img?type=acc&v=271878  

本人的图源api不再向外提供，可以选择随机指定文件夹内的图片。或者其他图源的api（推荐竖屏）  
imgApi与subimgApi支持本地文件夹绝对路径和http(s)等网络api  
`

export interface Config {
  interval: number,
  nightauto: boolean,
  nightStart: number,
  nightEnd: number,
  imgApi: string,
  waiting: boolean,
  callme: boolean,
  defaultMode: number,
  subimgApi: string
}

export const schema = Schema.object({
  interval: Schema.number().default(30000)
  .description('指令调用间隔(单位ms)[需要加载数据库]'),
  nightauto: Schema.boolean().default(true)
  .description('是否开启自动夜间模式'),
  nightStart: Schema.number().default(19)
  .description('自动夜间模式开启时间整点(24时制),结束时间要小于开始时间[晚上]'),
  nightEnd: Schema.number().default(8)
  .description('自动夜间模式关闭时间整点(24时制),结束时间要小于开始时间[早上]'),
  imgApi: Schema.string().required()
  .description('渲染模式美图的api或文件夹(推荐纯竖屏),仅支持返回图片的api,不要忘记http(s)://'),
  waiting: Schema.boolean().default(true)
  .description('是否开启发送消息等待提示'),
  callme: Schema.boolean().default(false)
  .description('是否开启callme功能'),
  defaultMode: Schema.union([0, 1, 2]).default(0)
  .description('选择默认输出模式: 0.图片渲染，1.纯文本，2.图文结合'),
  subimgApi: Schema.string().required()
  .description('图文模式图片的api或文件夹,仅支持返回图片的api,不要忘记http(s)://'),
})

export const using = ['puppeteer']
export function apply(ctx: Context, config: Config) {
  // write your plugin here
  ctx.command('今日运势',`查看今日运势(${config.nightStart%24}~${config.nightEnd%24}点自动夜间模式)`,{ minInterval: (config.interval?  config.interval:30000)}).alias('jrys')
  .option('out','-o 仅输出纯文本')
  .option('nonight','-n 无视夜间模式输出')
  .option('txtimg','-t 图文输出')
  .option('img','-i 渲染输出')
  .userFields(['name'])
  .action(async ({session,options}) => {
    // 配置文件防失误
    if (config.nightEnd%24 > config.nightStart%24) {
      config.nightStart = 19;
      config.nightEnd = 8;
    }
    // callme修改昵称 支持
    /** @type {string} */
    let name: String|undefined;
    if (ctx.database && config.callme) name = session.user.name;
    if (!name && config.callme) name = session.author.nickname;
    else name = session.username;
    if (config.defaultMode > 2) config.defaultMode = 0;
    // 暂存变量
    var cgColor='';
    var shadowc='';
    var lightcg='';
    // 硬核的夜间模式
    var daync = new Date();
    if (config.nightauto) {
      if((config.nightEnd?  config.nightEnd:8)<=daync.getHours() && daync.getHours()<(config.nightStart?  config.nightStart:19) || options.nonight) {
          cgColor = 'rgba(255, 255, 255, 0.6)';
          shadowc = '0px 0px 15px rgba(0, 0, 0, 0.3)';
          lightcg = 'brightness(100%)';
      } else {
        cgColor = 'rgba(105, 105, 105, 0.6)';
        shadowc = '0px 0px 15px rgba(255, 255, 255, 0.3)';
        lightcg = 'brightness(50%)';
      }
    } else {
      cgColor = 'rgba(255, 255, 255, 0.6)';
      shadowc = '0px 0px 15px rgba(0, 0, 0, 0.3)';
      lightcg = 'brightness(100%)';
    }
    // 设置style
    const htmlStyle = {
      background: `${cgColor}`
    }
    const cardStyle = {
      margin: '0 auto',
      padding: '12px 12px',
      height: '49rem',
      'max-width': '980px',
      'max-height': '1024px',
      background: `${cgColor}`,
      'border-radius': '15px',
      'backdrop-filter': `blur(3px)`,
      'box-shadow': `${shadowc}`,
      'writing-mode': 'vertical-rl',
      'text-orientation': 'mixed'
    }
    const imgStyle = {
      height: '100%',
      filter: `${lightcg}`,
      'overflow': 'hidden',
      'display': 'inline-block',
      'vertical-align': 'middle'
    }
    const leftStyle = {
      width: '35%',
      height: '65rem',
      'float': 'left',
      'text-align': 'center',
      background: `${cgColor}`,
    }

    // 图片处理
    let imgurl:any;
    let subimgurl:any;
    let etime = (new Date().getTime())%25565;
    if(config.imgApi.match(/http(s)?:\/\/(.*)/gi))  imgurl=(config.imgApi.match(/^http(s)?:\/\/(.*)#e#$/gi))? config.imgApi.replace('#e#',etime.toString()) : config.imgApi;
    else imgurl = pathToFileURL(resolve(__dirname, (config.imgApi + Random.pick(await getFolderImg(config.imgApi))))).href;

    if(config.subimgApi.match(/http(s)?:\/\/(.*)/gi))  subimgurl= (config.subimgApi.match(/^http(s)?:\/\/(.*)#e#$/gi))? config.subimgApi.replace('#e#',etime.toString()) : config.subimgApi;
    else subimgurl = pathToFileURL(resolve(__dirname, (config.subimgApi + Random.pick(await getFolderImg(config.subimgApi))))).href;

    var dJson:any = await getJrys(session.userId);
    if(options.out || config.defaultMode===1 && (!options.img&&!options.txtimg))
      session.send(<>
      <p>{name}的今日运势为</p>
      <p>{dJson.fortuneSummary}</p>
      <p>{dJson.luckyStar}</p>
      <p>{dJson.signText}</p>
      <p>仅供娱乐|勿封建迷信|仅供娱乐</p>
      </>);
    else {
      if(options.img || config.defaultMode===0 && (!options.out&&!options.txtimg)) {
        if(config.waiting)
          session.send('请稍等,正在查询……');
        session.send(
          <html style={htmlStyle}>
            <div style={leftStyle}>
              <p>{name}的今日运势为</p>
              <h2>{dJson.fortuneSummary}</h2>
              <p>{dJson.luckyStar}</p>
              <div style={cardStyle}>
                <p>{dJson.signText}</p>
                <p>{dJson.unsignText}</p>
              </div>
              <p>仅供娱乐| 相信科学，请勿迷信 |仅供娱乐</p>
            </div>
            <div style="height:65rem;width: 65%; float: right;box-shadow:0px 0px 15px rgba(0, 0, 0, 0.3);text-align: center;">
              <img style={imgStyle} src={imgurl}/>
            </div>
          </html>);
      }
      else {
        if(config.waiting)
          session.send('请稍等,正在查询……');
        try {
          session.send(<>
          <p>{name}的今日运势为</p>
          <p>{dJson.fortuneSummary}</p>
          <p>{dJson.luckyStar}</p>
          <p>{dJson.signText}</p>
          <image url={subimgurl} />
        </>);
        } catch(err) {
          session.send(
            <>
            <p>{name}的今日运势为</p>
            <p>{dJson.fortuneSummary}</p>
            <p>{dJson.luckyStar}</p>
            <p>图片Url: {subimgurl}</p>
            </>
          )
        }
      }
    }
    // 释放变量
    options.nonight=daync=null;
  })
}


async function getJrys(uid: any) {
  const etime = new Date().setHours(0, 0, 0, 0);
  return new Promise(resolve => {
    var todayJrys = (etime/1000 + uid)*2333%(jrysJson.length+1);
    resolve(jrysJson[todayJrys]);
  })
}

async function getFolderImg(folder:String) {
  let imgfilename = readFilenames(folder);
  const filteredArr = imgfilename.filter((filename) => {
    return /\.(png|jpg|jpeg|ico|svg)$/i.test(filename);
  });
  return filteredArr;
}

// 递归获取文件夹内所有文件的文件名
function readFilenames(dirPath:any) {
  let filenames = [];
  const files = fs.readdirSync(dirPath);
  files.forEach((filename) => {
    const fullPath = path.join(dirPath, filename);
    if (fs.statSync(fullPath).isDirectory()) {
      filenames = filenames.concat(readFilenames(fullPath));
    } else {
      filenames.push(filename);
    }
  });
  return filenames;
}
