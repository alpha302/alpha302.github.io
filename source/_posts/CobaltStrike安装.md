---
title: CobaltStrike安装
mathjax: true
copyright: true
comment: true
date: 2019-10-07 11:30:33
tags: CobaltStrike
categories: 工具使用
---
Cobalt Strike 一款以 metasploit 为基础的 GUI 的框架式渗透测试工具，集成了端口转发、服务扫描，自动化溢出，多模式端口监听，win exe 木马生成，win dll 木马生成，java 木马生成，office 宏病毒生成，木马捆绑。

<!-- more -->

---

#### 前言
下载 Cobalt Strike 3.14破解版本
> https://pan.baidu.com/s/1KaZtM7F8sV21Zd1q5upkMw 密码：2oij 

申请适用版会很麻烦，就直接贴出来
#### 服务器端安装与运行
Cobalt Strike3.0 需要开启团体服务器才可以链接使用，当然，这个服务器可以放到公网环 境下，或者放到自己想要搭建此服务的环境中。

在使用 Cobalt Strike 之前，需要安装 java 环境，具体怎么配置，请移步 [java 环境搭建](https://www.cnblogs.com/chuijingjing/p/10316310.html)

将Cobalt Strike上传到vps上，解压
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/cobaltstrike1.png)

```py
运行服务端：./teamserver 139.196.87.221 password        服务器IP 和 客户端连接密码

运行服务端：nohup ./teamserver 139.196.87.221 password &         放入后台运行
```
[修改Cobalt Strike的默认端口](https://www.3hack.com/note/96.html)
#### 客户端运行
服务运行以后，在客户端进行连接：
>  ./cobaltstrike

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/cobaltstike2.png)

这里 ip 使用服务器的 ip，端口修改为55555，用户名随意，密码为之前设置的密码，然后 connect, 弹出验证窗口，然后点是，就 进入 Cobalt Strike 了。

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/cobaltstike3.png)

#### 谈谈安装时的坑
首先 这个Cobalt Strike3以上版本真的很难找，你去官网下载现在还下载不了，网上绝大数分享也都已经失效

其次：在服务器端的java环境要换成Oracle jdk 1.8 版本,否则无法完成编译，客户端connect是也会出现超时的情况
