---
title: 懒人处理闲置vps__ubuntu16.04
mathjax: true
copyright: true
comment: true
date: 2019-10-26 21:24:26
tags: vps
categories: vps
---
今天刚好看b站，看到视频闲置的vps赚美刀。正好自己手里有闲置的阿里云Ecs，就趁机回收一下主机成本，也好久不碰vps了，上手试试。


<!-- more -->

---

## 0x01 关于平台
Alexamaster，是一家通过全自动挂机刷Alexa排名的网站，通过浏览器可以自动冲浪上网挂机，起付金额最低1$,有PAYPAL即可，国内可挂。

Vagex 是刷 youtube 点击量的平台，支持最多 5 个 ip 挂同一个账号，即可以 5 台机器同时进行，平均每月赚 1-5 刀。

Ebesucher 是刷网站访问量的挂机平台，是一家德国的公司，用欧元支付。大约每月 1 欧左右。

一开始就接触的Alexamaster，下面都以它为例

---
## 0x02 Alexamaster注册
无需翻墙[点击进入](https://www.alexamaster.net/a/my_profile.php)

填写资料，建议google邮箱。confire email可以在垃圾箱中找到。

注册之后找到挂机地址autosurf url

Earn Points - AutoSurf - how - copy autosurf url

![1](https://raw.githubusercontent.com/alpha302/cloudimg/master/D7AU56.png)
![2](https://raw.githubusercontent.com/alpha302/cloudimg/master/X26ZAP_ALVVD_EJA.png)

此时，在浏览器中打开网址就可挂机赚钱了。
如图
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/XUK.png)

## 0x3 vps_ubuntu
#### 安装VNC服务器并启用
```
#阿里云服务器ubuntu 16.04版本
root@iZuf6cicjbwbqh7486tzi8Z:~# apt-get install vnc4server      # 安装VNC服务器
root@iZuf6cicjbwbqh7486tzi8Z:~# vncserver    # 第一次运行vncserver设置VNC密码，看到类似 “New ‘:1 ()’ desktop is :1 (代表主机名）” 的信息，即表示启动 vnc 成功
root@iZuf6cicjbwbqh7486tzi8Z:~# vncserver :1    #开启端口5901
root@iZuf6cicjbwbqh7486tzi8Z:~# ufw allow 5901    #阿里云防火墙开启端口并进行安全组进行设置
```
#### 客户机中下载vnc viewer
windows下载[vnc viewer](https://www.realvnc.com/download/file/viewer.files/VNC-Viewer-6.18.625-Windows.exe)

通过vps的ip+vnc的序号连接

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/5ZB%5D2L5B15L.png)



#### 配置完整的桌面VNC

```
#连接上是一个空白的灰色屏幕，因为服务器的桌面进程尚未启动

root@iZuf6cicjbwbqh7486tzi8Z:~# vncserver -kill :1        #成功连接之后，再退出该连接。关闭VNC服务：
root@iZuf6cicjbwbqh7486tzi8Z:~# apt-get install --no-install-recommends ubuntu-desktop gnome-panel gnome-settings-daemon metacity nautilus gnome-terminal -y       #安装并使用 unity 桌面，这里仅安装核心组件(精简够用)
root@iZuf6cicjbwbqh7486tzi8Z:~# cp ~/.vnc/xstartup ~/.vnc/xstartup.bak                  #备份原有 xstartup 文件
root@iZuf6cicjbwbqh7486tzi8Z:~# vi ~/.vnc/xstartup
配置修改如下图所示，红色部分
root@iZuf6cicjbwbqh7486tzi8Z:~# vncserver :1    #保存并退出文件。重新启动VNC会话
```


![](https://raw.githubusercontent.com/alpha302/cloudimg/master/DUIHZCZ3.png)

#### VNC服务器自启动
```
root@iZuf6cicjbwbqh7486tzi8Z:~# crontab -e           #打开crontab，选择编译器4
@reboot /usr/bin/vncserver :1        #添加到文件的底部
保存并退出文件
```
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/671OU0W.png)

#### 使用
windows下连上VNC Viewer，挂上自动冲浪网址
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/VB4I4SMZ%7B%7DH0%5DLN.png)

此时已经完成

#### 优化
##### firefox
- 将浏览器更新到最新的Firefox，推荐Firefox
- 在浏览器中禁用弹出窗口阻止程序（必须启用JavaScript / Cookies 
- 取消阻止内容阻止程序
- 安装Alexa浏览器扩展: alexa-com-toolbar
- 关闭 Firefox 的浏览记录
- 关闭 Firefox 安装提示 
- 国内挂了一会会让你重置ip，推荐使用vpn，浏览器设置代理。[点击此处](https://blog.csdn.net/CSDNhuaong/article/details/78273782)

```
#定时重启Firefox
root@iZuf6cicjbwbqh7486tzi8Z:~# crontab -e
#在结尾附加
0 * * * * rm -rf /root/.vnc/*.log &> /dev/null
*/20 * * * * killall -9 firefox &> /dev/null
*/20 * * * * sleep 30; export DISPLAY=:1; firefox &> /dev/null
```

##### 开启Swap空间
开启Swap虚拟内存
```ruby
root@iZuf6cicjbwbqh7486tzi8Z:~# swapon -s #查看当前是否开启Swap空间，结果为空则未开启
root@iZuf6cicjbwbqh7486tzi8Z:~# fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile   #输入命令创建并启用 Swap 文件
root@iZuf6cicjbwbqh7486tzi8Z:~# vim /etc/fstab  #最后一行添加以下命令，设置开机自启
/swapfile none swap defaults 0 0
#删除Swap文件 
root@iZuf6cicjbwbqh7486tzi8Z:~# swapoff -a
root@iZuf6cicjbwbqh7486tzi8Z:~# rm -rf /swapfile
```



推荐的一些github上一键部署脚本
[点击此处](https://github.com/leitbogioro/Alexamaster-onkey-start)

## 后记
这里贴一下VNC Server命令
```ruby
#登陆
root@iZuf6cicjbwbqh7486tzi8Z:~# vncserver :2 设置客户端连接端口，一般端口号码在5901 ~ 5910 之间

#停止
root@iZuf6cicjbwbqh7486tzi8Z:~# vncserver -kill :2 只能使用kill暴力杀除命令

#同一个显示器可以连接多个客户机
root@iZuf6cicjbwbqh7486tzi8Z:~# vncserver -alwaysshared

#重启服务
root@iZuf6cicjbwbqh7486tzi8Z:~# service vncserver restart

#重置密码
root@iZuf6cicjbwbqh7486tzi8Z:~# rm /root/.vnc/passwd    # 重新进行初次登陆的设置

[破解vnc密码](https://github.com/x0rz4/vncpwd)
点击[强化vnc server默认密码连接，免VNC端口(5901)](https://hakula.xyz/tutorial/vagex.html)
#ssh隧道传输VNC，加密发送所有数据
#SSH创建仅通过默认SSH端口（22）将本地端口5901上的localhost转发到远程计算机的端口5901的本地隧道
```
