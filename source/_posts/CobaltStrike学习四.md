---
title: CobaltStrike学习四
mathjax: true
copyright: true
comment: true
date: 2019-10-16 16:39:58
tags: CobaltStrike
categories: 工具使用
---

CobaltStrike之提权及spawn

<!-- more -->

---
# 1 提权
## 获取beacon
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/ededw.png)

## 1.1 elevate-kit提权
查看cs自带的漏洞库
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/1E5%5DVNJGT%40U42I%40OW1.png)

### 1.2 导入cna文件
丰富我们的漏洞库
- 点击左上角cobalt strike->script manager
- 点击load，找到下载的ElevateKit工具路径，选择cna文件
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/ewewe.png)

选中elevate.cna点击‘打开’
然后回到beacon shell，再次输入elevate
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/FOKI%24%257%25P5KSFG4GX%60G8.png)

## 1.3 选择exp进行提权
右键->access->elevate
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/222222223.png)

### 1.4 使用ms16-032成功,获得管理员权限
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/3MOEK3QYDM%7BR%7D6ZAH.png)


# 2.Spawn
## 什么是spawn
>  简单理解,所谓的`派生`,即仅仅通过一个beacon shell就可以再孵化出n个shell,shell与
shell之间相当于以一种级联的形式存在的

这样一种场景：
假如你同事跟你说，他需要你那个目标的shell，但又不想直接连到你的团队服务器上。事实上，这个场景非常常见，cs针对这种场景的解决办法就是：让他直接在他本地起一个团队服务器创建个监听器，然后你再用你的cobaltstrike客户端连到他的团队服务器上，最后，把他要那个目标的shell派生到他指定的那个监听器上即可。

## 2.1切换另一台kali，启动teamserver
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/GJML%24%60Z%7BUPIJ9_58USSL.png)

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/MD%60Z2%5B%24CNB%24Z6D0.png)

然后在这台kali上启动一个客户端
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/8WNL9Q5%5B%5DWTD0LH_G%5B1RN.png)

可以看到此时是没有beacon
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/F09J%40O_D98LNC%251XLVQ1.png)

创建一个listener

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/R%5BTRJ8%7E0%7D1FKO%24%25%7ETI.png)

## 2.2切换到第一台kali
在上一台已经拿到beacon的客户端上，创建新的连接，连接到.150这台kali启动的teamserver上
点击左上角，cobalt strike->new connection
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/SZB%25%7EPU74%5D3M40VHZHK9_MB.png)

Host填.150那台kali，点击connect

此时在左下角我们可以看到，在客户端这儿是可以切换两台teamserver的
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/W5SUY%6051Z%7DVKRX%25NIZQS.png)

我们切换到neo@127.0.0.1
选中一个beacon，右键spawn
然后选中在.150的cs客户端上创建的listener
点击choose即可

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/KI%60VA%7DI%24LCC1FTL3IW.png)

## 2.3切换.150的cs客户端
可以看到此时已经收到.100的cs客户端spawn来的beacon了

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/AC8XWBKOSYDDB.png)