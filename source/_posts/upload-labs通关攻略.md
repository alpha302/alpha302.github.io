---
title: upload-labs通关攻略
mathjax: true
copyright: true
comment: true
date: 2019-11-20 17:19:51
tags: 靶场
categories: OWASP
---
upload上传是比较基本的web漏洞，看到很多的大佬发布的钓鱼，人肉都用到过upload获取shell。个人感觉这个总结起来也比较方便简单。


<!-- more -->

---

**项目地址：**
 
https://github.com/c0ny1/upload-labs


## Upload-labs练习：
#### class-1 js限制文件上传

前端限制后缀名，上传jpg文件，拦包改后缀绕过

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/EQ6%24_TDU.png)

这里可以看到成功上传

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/IXLM%7DG7PMKW.png)

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/QF%5BHA%7D%5BZT.png)

#### class-2 MIME限制文件上传
上传php文件，显示类型不正确，实际上MIME验证就是检测Content-type字段值的，直接更改上传数据包中的Content-type(image/jpeg、image/png、image/gif)即可绕过

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/FQ78VP%60B7V5.png)

修改Content-type值为图片的格式（image/jpeg），成功绕过

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/3YQDUP_SBN21.png)

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/K8AUCXKP%40I2KU%402D1O788VY.png)

#### class-3 黑名单限制

通过上传不受欢迎的php扩展来绕过黑名单。例如：pht，phpt，phtml，php3，php4，php5，php6

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%7E%40QC%5B5GWHL7_8O50XNED%24UA.png)

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/4G%24%7ED%5B%2587STM3.png)

服务器已经解析为php
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/UKQ_W5NXW.png)

#### class-4 .htaccess绕过
phpstudy打开配置文件 httpd-conf
AllowOverride None --> AllowOverride All
前提条件（1.mod_rewrite模块开启。2.AllowOverride All）

虽然还是黑名单，但几乎过滤了所有有问题的后缀名，除了.htaccess，于是首先上传一个.htaccess内容如下的文件:

```r
SetHandler application/x-httpd-php
```
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/QXNJAQ1.png)

这样所有文件都会解析为php，然后再上传图片马，可以解析绕过

![]()

#### class-5 点+空格+点绕过

代码先是去除文件名前后的空格，再去除文件名最后所有的.，再通过strrchar函数来寻找.来确认文件名的后缀，但是最后保存文件的时候没有重命名而使用的原始的文件名，导致可以利用1.php. .（点+空格+点）来绕过

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%7BW%7EV256%7DNIN1%7BR41.png)

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/6Y259%608QCF.png)

#### class-6 大小写绕过

#### class-7 
