# koishi-plugin-jryspro

[![npm](https://img.shields.io/npm/v/koishi-plugin-jryspro?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jryspro)

jrys plugin for bella and it is depended API

## 这里不怎么更新，可以前往github

## 使用方法
指令： 今日运势  
指令别名： jrys  
可选选项：  
 - * -o 纯文本输出，可以提高输出速率  
 - * -n 无视夜间模式输出，可能有群友不太喜欢夜间模式的  

## 配置
interval:   指令调用间隔，得加载数据库才能使用调用间隔，单位是毫秒(ms)  
  
nightStart: 夜间模式开启时间整点(24时制)，一般设置在晚上  
  
nightEnd:   夜间模式结束时间整点(24时制)，一般设置在早上  
> 需要注意的是，结束时间要小于开启时间，否则启用默认值  
  
imgApi:     图片api地址，仅支持返回图片的api，不支持json等。由于我只制作了竖屏图片适配，建议使用竖屏的图片。在填写时不要把http(s)://忘了哦。

# History
## v1.0.0  
 - 写好了第一版，发布了插件  
## v1.0.1  
 - 修改了README  
## v1.0.2  
 - 新增等待提示  
 - 将“您”改成群名/用户昵称  
 - 修改必备插件为puppeteer，database为可选。没有puppeteer渲染不了图片，没有database不能限制调用时间。  
## v1.0.3  
 - 修改版本兼容,从v4.11.0往上开始兼容  
