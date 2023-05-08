import { Context, Schema } from 'koishi'
import request from 'request'
import { } from '@koishijs/plugin-rate-limit'

export const name = 'jryspro'

export const using = ['puppeteer','database']

export interface Config {
  interval: number,
  nightStart: number,
  nightEnd: number,
  imgApi: string,
  waiting: boolean,
  defaultMode: number,
  subimgApi: string
}

export const schema = Schema.object({
  interval: Schema.number().default(30000)
  .description('指令调用间隔(单位ms)[需要加载数据库]'),
  nightStart: Schema.number().default(19)
  .description('自动夜间模式开启时间整点(24时制),结束时间要小于开始时间[晚上]'),
  nightEnd: Schema.number().default(8)
  .description('自动夜间模式关闭时间整点(24时制),结束时间要小于开始时间[早上]'),
  imgApi: Schema.string().role('link').default('https://api.iin0.cn/img/ver')
  .description('渲染模式美图的api(推荐纯竖屏),仅支持返回图片的api,不要忘记http(s)://'),
  waiting: Schema.boolean().default(true)
  .description('是否开启发送消息等待提示'),
  defaultMode: Schema.number().default(0)
  .description('选择默认输出模式: 0.图片渲染，1.纯文本，2.图文结合'),
  subimgApi: Schema.string().role('link').default('https://api.iin0.cn/img/ver')
  .description('图文模式图片的api,仅支持返回图片的api,不要忘记http(s)://')
})


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
    if (ctx.database) name = session.user.name;
    if (!name) name = session.author.nickname;
    if (!name) name = session.author.username;
    if (config.defaultMode > 2) config.defaultMode = 0;
    // 暂存变量
    var cgColor='';
    var shadowc='';
    var lightcg='';
    // 硬核的夜间模式
    var daync = new Date();
    if((config.nightEnd?  config.nightEnd:8)<=daync.getHours() && daync.getHours()<(config.nightStart?  config.nightStart:19) || options.nonight) {
      cgColor = 'rgba(255, 255, 255, 0.6)';
      shadowc = '0px 0px 15px rgba(0, 0, 0, 0.3)';
      lightcg = 'brightness(100%)';
    }
    else {
      cgColor = 'rgba(105, 105, 105, 0.6)';
      shadowc = '0px 0px 15px rgba(255, 255, 255, 0.3)';
      lightcg = 'brightness(50%)';
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

    var apiurl = `https://api.fanlisky.cn/api/qr-fortune/get/${session.userId}`
    const data = await makeRequest(apiurl);
    var dJson = JSON.parse(data.toString());
    if(options.out || config.defaultMode===1 && (!options.img&&!options.txtimg))
      session.send(<>
      <p>{name}的今日运势为</p>
      <p>{dJson.data.fortuneSummary}</p>
      <p>{dJson.data.luckyStar}</p>
      <p>{dJson.data.signText}</p>
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
              <h2>{dJson.data.fortuneSummary}</h2>
              <p>{dJson.data.luckyStar}</p>
              <div style={cardStyle}>
                <p>{dJson.data.signText}</p>
                <p>{dJson.data.unSignText}</p>
              </div>
              <p>仅供娱乐| 相信科学，请勿迷信 |仅供娱乐</p>
            </div>
            <div style="height:65rem;width: 65%; float: right;box-shadow:0px 0px 15px rgba(0, 0, 0, 0.3);text-align: center;">
              <img style={imgStyle} src={(config.imgApi? config.imgApi:"https://api.iin0.cn/img/ver")}/>
            </div>
          </html>);
      }
      else {
        var suburl = '';
        var etime = Math.floor(new Date().getTime()/10000);
        if(config.subimgApi)  suburl=`${config.subimgApi}?v=${etime}`;
        else  suburl = `https://api.iin0.cn/img/ver?v=${etime}`
        if(config.waiting)
          session.send('请稍等,正在查询……');
        session.send(<>
          <p>{name}的今日运势为</p>
          <p>{dJson.data.fortuneSummary}</p>
          <p>{dJson.data.luckyStar}</p>
          <p>{dJson.data.signText}</p>
          <image url={suburl} />
        </>);
      }
    }
    // 释放变量
    options.nonight=daync=null;
  })
}

async function makeRequest(url) {
  const opt={url: url}
  return new Promise((res,rej) => {
    request.get(opt,(err,rep,data) => {
       if(err) rej(err);
       else res(data);
    })
  })
}

async function getImgUrl(url:String) {
  var getUrl = await makeRequest(url);
  return JSON.parse(getUrl.toString()).imgurl
}
