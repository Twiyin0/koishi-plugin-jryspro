# koishi-plugin-jryspro

[![npm](https://img.shields.io/npm/v/koishi-plugin-jryspro?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jryspro)

jrys plugin for bella and it is depended API
## 更新插件前请停止运行插件
由于v1.2.1到v1.3.0属于大改  
插件配置项会有改动不停止插件直接更新可能会导致koishi炸掉  

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
| `nightauto`    |     | 是否开启自动夜间模式                                                                         |
| `nightStart`  |     | 夜间模式开启时间整点(24时制)，一般设置在晚上                                                                                |
| `nightEnd`    |     | 夜间模式结束时间整点(24时制)，一般设置在早上(需要注意的是，结束时间要小于开启时间，否则启用默认值)                                                    |
| `imgApi`      |(v1.3.0可用本地文件夹绝对路径)| 图片api地址，仅支持返回图片的api，不支持json等。由于我只制作了竖屏图片适配，建议使用竖屏的图片。在填写时不要把`http(s)://`忘了哦。                            |
| `waitting`    |     | 是否开启等待提示，默认开启                                                                                           |
| `defaultMode` |     | 默认输出模式，非以下参数默认为`0`                                                                                      |
|               | `0` | (默认)渲染输出-puppeteer渲染输出                                                                                  |
|               | `1` | 纯文本输出，仅输出文本                                                                                             |
|               | `2` | 图文输出，文字+图片的输出方式                                                                               |
| `subimgApi`   |(v1.3.0可用本地文件夹绝对路径)| 图文模式的图片api地址，仅支持返回图片的api，不支持json等。api后我加了?v=的参数用来刷新图片，如果你的api跟v这个参数冲突了可以换一个api或者。在填写时不要把`http(s)://`忘了哦 |
| `fortuneApi`  |(v1.3.0前可用)| 运势源api，尽可能用自己的api（我服务器也不是永久的，也可能被打死如果没了你可以选择自建后端然后用自己的api）                                              |

# CHANGELOG

[更新日志](https://raw.githubusercontent.com/Twiyin0/koishi-plugin-jryspro/main/CHANGELOG.md)

# TIP
如果没有图片输出可以看看log时不时puppeteer有问题  
确定puppeteer没问题那就是我服务器寄了，耐心等待  
4.22后不会再勤奋更新，有事情做喽（瞎说什么呢, 怎么可能跑路！！）  
有问题就github开issues吧  
