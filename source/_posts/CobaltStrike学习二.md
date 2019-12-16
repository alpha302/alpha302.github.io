---
title: CobaltStrike学习二
mathjax: true
copyright: true
comment: true
date: 2019-10-09 21:00:19
tags: CobaltStrike
categories: 工具使用
---
了解CobaltStrike的功能，深入理解各个功能模块的含义及使用，能够根据具体情况调用不同模块来使用


<!-- more -->

---

### Cobalt Strike模块
#### New Connection
- connection 新建立一个用户连接，即连接到一个新的teamserver上
- Preferences 配置自己的设置，还记得我们第二次连接服务端的时候不用校验hash吗，就是因为hash已经被缓存在这儿了

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/deedede.png)

#### Visualization可视化 
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/%25XVR(HW%24CVM10S)GTJ2O4IK.png)

- pivot graph   控制主机视图
- session table 一个会话
- Target table 目标表

#### Vpn lnterfaces 
Vpn lnterfaces  vpn接口，一般在公网环境下很实用

####  listeners
建立个反弹shell的监听器

#### Script manager
Script manager 用于脚本管理，我们前面提到CS可以通过AggressorScripts脚本来加强自身，能够扩展菜单栏，Beacon命令行，提权脚本等。

### Attacks
#### Packages
> 生成恶意文件


![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/%7B%7DS%7DC0CY%5D4RVAQS7KCFW%40%7BU.png)  
  
      HTML Application   生成hta文件

      MS Office Macro     宏office文件

      Payload Generator  生成各种语言版本的payload

      USB/CD AutoPlay    利用自动播放运行的被控端文件

      Windows Dropper   捆绑器可将任意正常的文件

      Windows Executable payload  生成可执行文件 (一般使用这个)

      Windows Executable (S)  把包含payload,Stageless生成可执行文件(包含多数功能)

#### Web Drive-by
> 创建一个渠道，能够让靶机下载执行生成的恶意文件

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/wwwwwwwwwwwwwwwwww.png)

      CS支持的方式包括：

      Manage    开启的所有web服务

      Clone Site 克隆网站

      Host File   提供Web以供下载某文件

      Scripted Web Delivery  为payload提供web服务以便于下载和执行

      Signed Applet Attack   启动一个Web服务以提供自签名JavaApplet的运行环境

      Smart Applet Attack     自动检测Java版本并利用已知的exploits绕过security

      System Profiler             获取系统，Flash，浏览器版本等

      我们是通过web的方式，在靶机上执行下载命令完成的


#### SpearPhish
> 即鱼叉式网络钓鱼

### beacon命令
      右键interact可以开启beacon，我们用它来执行各种命令

      查看怎么使用哪些命令，可以使用help

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/GRY%608%25_%25VO382RDDX%60C_2DT.png)

      注意，在Cobalt Strike中它的心跳默认是60s，默认60s一次回传，这会让我们执行的命令响应很慢，在下载文件面前更为明显，所以实验时会把时间降低一点。但是在实战时应根据实战环境来调节，建议不要太快，不然流量特征会过于明显，容易暴露自己。
       我这里设置为如下，让靶机每5s下载一次任务

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/dededede.png)

### Access
事实上，右键打开的不止interact
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/eeeeeeeeeeeeeeee.png)

      Interact   打开beacon

Access

      dumphashes 获取hash

      Elevate 提权

      GoldenTicket 生成黄金票据注入当前会话

      MAketoken  凭证转换

      RunMimikatz 运行 Mimikatz

      SpawnAs 用其他用户生成CobaltStrike侦听器

Explore

       BrowserPivot 劫持目标浏览器进程

       Desktop(VNC)  桌面交互

       FileBrowser  文件浏览器

       NetView 命令Net View

       Portscan 端口扫描

       Processlist 进程列表

       Screenshot截图

Pivoting

       SOCKSServer 代理服务

       Listener  反向端口转发

       DeployVPN 部署VPN

Spawn 新的通讯模式并生成会话

Session 会话管理，删除，心跳时间，退出，备注

### View

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/X_SVGWCWGNL%2435%7BC%403%4099RC.png)

      Applications 用于显示 System Profiler 获取的目标浏览器，操作系统，flash版本

      Credentials 显示所有已经获取的用户主机hash

      Downloads 显示下载的文件

      Event log 事件日志记录团队 目标上线等记录

      Keystrokes 目标键盘记录

      Proxy Pivots 代理信息

      Screenshots 屏幕截图

      Script Console 加载自定义脚本

      Targets 显示所有主机

      Web log web服务日志

      这些选项直接打开是没有用的，得在beacon中执行相应命令后才能使用，之前演示了screenshot，这里示范个经典的动作--获取hash，不过需要administrator权限，所以顺便演示一下使用CS提权，右键-》access->elevate


![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/%5BW%24%40%7DMLE1%7B18D%60%7BQN%25MC5%24F.png)

会自动选择合适的exp，点击launch即可，此时在日志中可以看到已经拿到system权限了
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/X28QG%40PG%40SH1%7B9%7B%24KH64PSQ.png)

现在我们有2个会话，一个yale，一个system
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/Y9KR0E%5BB3%7D7%5D%25%404%7DAJY8.png)

我们这时候需要和system交互，所以还是同样在system上右键-》interact
输入hashdump
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/SN%7DK5%7ENHG91%40M%6099JEUDAL.png)

这些结果都被缓存在了view->credentials
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/%5D%60AN3%406%5DTM9%7BXA4IYJ26S89.png)

###   最后一步是生成报告
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/_%60LNV0M_FY33TYMHR67.png)
   
      Activity report  活动报告

      Hosts report  主机报告

      Indicators of Compromise 威胁报告

      Sessions report  会话报告

      Social engineering report  社会工程学报告

#### 生成新鲜的威胁报告
还是同样的方法使用默认名，默认路径生成
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/FH1%25K0AL2YAFP9EXF%25JV.png)

