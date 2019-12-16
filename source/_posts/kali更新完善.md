---
title: kali更新完善
mathjax: true
copyright: true
comment: true
date: 2019-10-29 20:34:57
tags: 工具使用
categories: 工具使用
---
工欲善其事，必先利其器。kali是几年来，hacker使用最多的一款操作系统。现在已有5年的历史了，现在最新版本为2019.3.


<!-- more -->

---
## 安装环境
一般kali我们都是装在虚拟机中。这里的ios镜像我们可以选择ios和vm版本
- [ios 版本](https://www.kali.org/downloads/)的可以装在vm中或者是真实的生产环境(推荐MATE版本)
- [vm版本](https://www.offensive-security.com/kali-linux-vm-vmware-virtualbox-image-download/)的我们可以使用

## 优化
由于是kali的更新完善，这里不在对kali的安装进行操作。推荐大家直接上手vm版本的

#### 登录
用户唯一：root
密码默认：toor

#### 更新源
```py
root@kali:~# vi/etc/apt/sources.list
#在vi的编辑下添加以下国内镜源
#中科大
deb http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
deb-src http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
 
#阿里云
deb http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
deb-src http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
 
#清华大学
deb http://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free

#并将kali自带的镜像源注释，以便加快我们apt的安装使用
#deb http://http.kali.org/kali kali-rolling main non-free contrib
```
#### 系统更新
```
root@kali:~# apt-get update && apt-get upgrade && apt-get dist-upgrade               # 刷新系统&升级系统&版本升级
```

#### 系统设置
- Settings-->Privacy-->screen lock off     # 关闭锁屏
- Settings-->Power-->Blank screen    #关闭黑屏
- Settings-->Devices-->Keyboard --> Screenshots-->Save a screenshot of an area to Pictures    #截图的快捷键(存储到Picture)
- Settings-->Background     #设置你的[背景图片](https://raw.githubusercontent.com/alpha302/cloudimg/master/100.jpg)
- Settings --> Universal Access -> Seeing -> Large Text          #放大字体，很舒服
  
#### 系统中文
不推荐使用中文的操作系统，能英文还是英文优先
也不推荐大家使用系统的Region&Language去切换中文，因为这样设置的系统不是完全中文
```py
root@kali:~# dpkg-reconfigure locales
#选择字符编码：en_US.UTF-8、zh_CN.GBK、zh_CN.UTF-8
#选择字符：zh_CN.UTF-8（记得用空格）
#重启生效
```
#### 中文输入法
```py
root@kali:~# apt-get install fcitx       #安装输入法框架
root@kali:~# apt-get install fcitx-googlepinyin    #安装google拼音输入法
#重启生效
root@kali:~# im-config
将google拼音设置为首选项
验证，ctrl+空格切换输入法

```
#### 网络问题
可能有些小伙伴一装上kali就上不了网。可能ping不同外网，可能只能ping物理机，可能没有eth0(默认)，可能之前能连网，但换了一个环境就不行等等的问题
这些问题，可能的原因可以是 ：
```py
- 1 你物理机是网线连接，你的kali是用的直连，自己没配置/etc/network/interface
- 2 物理机是wife连接，你的kali 是nat连接，你的/etc/NetworkManager/NetworkManger.conf 没有设置true
- 3 你的物理机的服务VMware DHCP Service，VMware NAT Service停止了
- 4 还有的时候是在虚拟网络编译器中Vmnet信息中桥接模式选择的自动，有些网卡不是很友好，可以换成ipcofig中使用的网卡
- 5 最后一个解决的办法，实在没招了，点开vmware 左上角的编辑选择虚拟网络编译器，点击更改设置，还原默认设置即可
```
#### 安装代理
为了方便日后的使用还是先装一下代理工具shadowsocks-qt5
```py
root@kali:~# apt-get update
root@kali:~# apt-get install shadowsocks-qt5
```
在系统中搜索shadowsocks-qt5
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/YEVPPYH.png)

打开做设置如图
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/233.png)

测试
对firefox做代理
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/ZN8Y9L9ZR.png)

完成
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/Screenshot%20from%202019-10-29%2010-42-00.png)


## 最后
别忘了给kali做一份快照
> init 0 关机大吉
