---
title: CobaltStrike学习一
mathjax: true
copyright: true
comment: true
date: 2019-10-08 20:33:43
tags: CobaltStrike
categories: 工具使用
---
一次完整的渗透试验，熟悉cs的基本使用


<!-- more -->
> 启动服务端-》在客户端连接服务端-》创建listener-》创建攻击载荷-》投递载荷-》靶机下载执行-》靶机上线-》拿到shell-》生成渗透测试报告。
---
### 启动服务端
我是建在阿里云的vps上，搭建cobaltstrike里有介绍

### 客户端连接
同样在搭建的文章里介绍了

### 创建listener
- 左上角Cobaltstrike--> listeners
- 右下角菜单栏有add，添加新listener
- Host为kali本机的ip

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-09%2004-41-53%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

name随意，payload主要分为beacon和foreign两大类

      Beacon为内置的Listener，即在目标主机执行相应的payload，获取shell到CS上；其中包含DNS、HTTP、SMB。

      Foreign为外部结合的Listener，常用于MSF的结合
save生成，并点击确定

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-09%2004-53-44%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

此时，listener出现一条记录

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-09%2004-56-34%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

### 创建攻击载荷
- 攻击途径 Attacks-->HTML Application
- 选择攻击方法 PowerShell
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-09%2005-01-12%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

点击generate生成，文件路径和文件名随意
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-09%2005-03-58%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

### 投递载荷
- Attacks-->Web Drive-by-->Host File

file选择前面生成的hta的文件路径

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-09%2005-09-15%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

点击launch生成链接

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-09%2005-11-39%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

### 靶机下载执行
win7 sp1，cmd,执行mshta命令，mshta使用来执行.HTA文件

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/JL3PN8BHRKHGIH%7DYS9HR0US.png)

###  靶机上线

在kali中可以看到肉鸡上线，event log中有相关日志

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-09%2005-18-33%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

