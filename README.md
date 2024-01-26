# koishi-plugin-jryspro

[![npm](https://img.shields.io/npm/v/koishi-plugin-jryspro?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jryspro)

jrys plugin for bella and it is depended API
## 注意
* 更新前请看[更新日志](https://raw.githubusercontent.com/Twiyin0/koishi-plugin-jryspro/main/CHANGELOG.md)，也许有些版本你并不需要更新  
* 如果需要将v1.2.x更新到v1.3.x请先停止本插件再更新，以免koishi炸掉  
* v1.3.3(非重要更新)  如果你的图源api地址不支持?random参数，请不要更新此插件  

## 使用方法
指令： 今日运势  
指令别名： jrys  
可选选项：  
* -o 纯文本输出，可以提高输出速率  
* -n 无视夜间模式输出，可能有群友不太喜欢夜间模式的  
* -t 输出图文，有群友想存图的
* -i 渲染图模式输出，这个是默认的

> 如果你无法使用此插件，请检查  
> - 1. (使用命令时无反应，报错等)请检查指令是否有冲突或者是否正确安装puppeteer  
> - 2. 提示“发生未知错误”可能是没有获取到群友的uid，需要在数据库内刷新一下
> - 3. “数据出错”之类的提示不是本插件的提示，可能你装了其他插件
> - 4. 启用不了插件。请检查koishi版本，puppeteer版本等是否再兼容范围内，或重启koishi，删除此插件依赖再尝试重装

随机文件夹内图片时请注意路径\`C:user/path/to/\`不要把后面的/忘了   

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

## api说明
* api url以 #e# 结尾可以在末尾添加更新时间戳(例子后面等价的数字为当前时间戳)  
* 例: https://api.example.com/img?#e#  ==等价于== https://api.example.com/img?271878  
* 例: https://api.example.com/img?type=acc&v=#e#  ==等价于== https://api.example.com/img?type=acc&v=271878  

本人的图源api不再向外提供，可以选择随机指定文件夹内的图片。或者其他图源的api（推荐竖屏）  
imgApi与subimgApi支持本地文件夹绝对路径和http(s)等网络api  

# TIP
如果没有图片输出可以看看log时不时puppeteer有问题  
确定puppeteer没问题那就是api寄了或者本地路径没填对，别把最后面的/省了  
有问题就github开issues吧  
