---
title: Web渗透测试———流程
mathjax: true
copyright: true
comment: true
date: 2019-11-29 14:46:28
tags: 渗透测试
categories: 渗透测试
---
- 渗透测试：出于保护系统的目的，更全面地找出测试对象的安全隐患。
- 入侵：不择手段地（甚至是具有破坏性的）拿到系统权限。


<!-- more -->


---

## 流程图

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/X%25D%24A%5DOQ4%409RD0.png)

一般渗透测试过程 ![一般渗透测试过程](https://raw.githubusercontent.com/alpha302/cloudimg/master/v2-1efe3d139106d8755d376136120fbbb4_r.jpg)


##  信息收集
### 1. 域名、IP、端口
 #### 域名信息查询：
- 收集注册人信息，域名DNS服务器信息，子域名查询

1.1.1 Whois查询

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/X5M93TG2IOGPZB%2581H6%7B8Q3.png)


在线查询网站
```r
https://dnsdb.io/zh-cn/
https://whois.aizhan.com
http://whois.chinaz.com
https://www.virustotal.com
```
1.1.2 空间搜索引擎SSL证书

[fofa](https://fofa.so)查询子域名
```R
#搜索企业证书 北京京东上科信息科技有限公司
cert="Organization：Beijing Jingdong Shangke Information Technology"
```
1.1.3 其他泄露信息

js，图片，css，title，copyright，网站跳转，crossdomain.xml 文件

1.1.4 子域名爆破 

子域名检测工具

Layer子域名挖掘机，Sublist3r subDomainsBrute

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-30%2021-33-21%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-30%2021-56-50%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)


#### IP信息查询： 
- 确认真实IP，绕过CDN

1.2.1 判断是否使用CDN

进行全国异地ping，对比每个地区的IP结果

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/IRATI6A1%24K.png)

在线异地ping网站
```R
https://www.17ce.com
http://ping.chinaz.com/
```
绕过CDN寻找真实IP

命令：nslookup -qt=A baidu.com 

常规方法
- 分站域名。CDN一般都存在在主站上，分站可能没有挂CDN，可以ping二级域名获取分站IP，可能会出现分站和主站不是同一个IP，但在一个C端下。如果是架在云服务器上，那就不可行。
- 国外访问。国内的CDN往往只针对国内用户的访问加速，国外的用户就不一定了。
  国外在线代理网站：https://asm.ca.com/en/ping.php
  
  ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%24ML%7DIZBQ9U%5BE.png)
- 查询域名解析记录 查询网站没用CDN之前的IP历史记录
   
  ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/83%404KDP%5D%245FCV.png)

  ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/_V%7DQ60BSLR6MOWUAROE.png)

  域名解析记录网站：
    ```R
    https://x.threatbook.cn
    http://viewdns.info/
    http://toolbar.netcraft.com/site_report?url=
    ```

####  端口信息查询：
- 确认开放端口

1.3.1 Nmap扫描

[Nmap基础教程](https://blog.csdn.net/qqchaozai/article/details/102521557)

#### 指纹识别

首页index.php,html,js,css中多少会包含特征码。例如WordPress在robots.txt中包含wp-admin。

在线CMS指纹查询：
``` r
BugScaner: http://whatweb.bugscaner.com/look
云悉指纹：http://www.yunsee.cn/finger.html
Whatweb：http://whatweb.net
```
whatweb 使用

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-30%2022-25-06%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)


后台特征

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/1.png)


## 漏洞探测

- 主机扫描
  
  1. 主机扫描 [Nessus](https://www.52pojie.cn/thread-898541-1-1.html)
   
    
     查看有无CVE漏洞
    
    
- Web扫描
    1. web扫描 AWVS
    
     [安装教程](https://www.cnblogs.com/LyShark/p/11401811.html)   

- 渗透测试
    1. BurpSuite： [下载地址](http://ximcx.cn/post-110.html) Kali已经有2.0版本了

## 验证漏洞
[逻辑漏洞](https://blog.csdn.net/qqchaozai/article/details/102802018)