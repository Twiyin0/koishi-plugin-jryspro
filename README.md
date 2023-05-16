# koishi-plugin-jryspro

[![npm](https://img.shields.io/npm/v/koishi-plugin-jryspro?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jryspro)

jrys plugin for bella and it is depended API

## 这里不怎么更新，可以前往github

## 使用方法
指令： 今日运势  
指令别名： jrys  
可选选项：  
* -o 纯文本输出，可以提高输出速率  
* -n 无视夜间模式输出，可能有群友不太喜欢夜间模式的  
* -t 输出图文，有群友想存图的
* -i 渲染图模式输出，这个是默认的

## 配置
| 配置项           | 参数  | 描述                                                                                                      |
|---------------|-----|---------------------------------------------------------------------------------------------------------|
| `interval`    |     | 指令调用间隔，得加载数据库才能使用调用间隔，单位是毫秒(ms)                                                                         |
| `nightStart`  |     | 夜间模式开启时间整点(24时制)，一般设置在晚上                                                                                |
| `nightEnd`    |     | 夜间模式结束时间整点(24时制)，一般设置在早上(需要注意的是，结束时间要小于开启时间，否则启用默认值)                                                    |
| `imgApi`      |     | 图片api地址，仅支持返回图片的api，不支持json等。由于我只制作了竖屏图片适配，建议使用竖屏的图片。在填写时不要把`http(s)://`忘了哦。                            |
| `waitting`    |     | 是否开启等待提示，默认开启                                                                                           |
| `defaultMode` |     | 默认输出模式，非以下参数默认为`0`                                                                                      |
|               | `0` | (默认)渲染输出-puppeteer渲染输出                                                                                  |
|               | `1` | 纯文本输出，仅输出文本                                                                                             |
|               | `2` | 图文输出，文字+图片的输出方式（暂无法修改api）                                                                               |
| `subimgApi`   |     | 图文模式的图片api地址，仅支持返回图片的api，不支持json等。api后我加了?v=的参数用来刷新图片，如果你的api跟v这个参数冲突了可以换一个api或者。在填写时不要把`http(s)://`忘了哦 |
| `fortuneApi`  |     | 运势源api，尽可能用自己的api（我服务器也不是永久的，也可能被打死如果没了你可以选择自建后端然后用自己的api）                                              |

# History
## v1.0.0  
* 写好了第一版，发布了插件  
## v1.0.1  
* 修改了README  
## v1.0.2  
* 新增等待提示  
* 将“您”改成群名/用户昵称  
* 修改必备插件为puppeteer，database为可选。没有puppeteer渲染不了图片，没有database不能限制调用时间。  
## v1.0.3  
* 修改版本兼容,从v4.11.0往上开始兼容  
## v1.0.4
* 新增图文模式，但是图文模式只能使用我的api，如果有需要可以自己copy源码自行修改，进行二次开发(这一版代码写的有点shi, 见谅)
## v1.0.5
* 新增callme昵称支持
## v1.0.6
* 现在可以修改图文模式的图片api了，但跟渲染图一样只能使用返回图片的api。  
> 需要注意的是，api后我加了个v的参数作为时间戳来刷新图片如果您的api有跟v参数冲突的建议换一个api或者二次开发本插件

## v1.1.0
* 后端api寄了，现在可以配置运势源的api，如果我的也寄掉了那么请换成你自建的后端或者用别人的后端  
* 新增`fortuneApi`配置  
> 运势源api仓库[https://github.com/Twiyin0/jryspro-api](https://github.com/Twiyin0/jryspro-api)

# TIP
如果没有图片输出可以看看log时不时puppeteer有问题  
确定puppeteer没问题那就是我服务器寄了，耐心等待  
4.22后不会再勤奋更新，有事情做喽（瞎说什么呢, 怎么可能跑路！！）  
有问题就github开issues吧  
