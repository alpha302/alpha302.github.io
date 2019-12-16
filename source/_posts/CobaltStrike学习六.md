---
title: CobaltStrike学习六
mathjax: true
copyright: true
comment: true
date: 2019-10-18 18:50:33
tags: CobaltStrike
categories: 工具使用
---
使用cs进行钓鱼攻击。


<!-- more -->

---

## cs获取靶机权限
从下图开始
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-18%2006-57-50%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

- 进入beacon console
- 设置心跳时间0
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-18%2007-01-20%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

## 克隆我们的网站
- Attacks->web driver by ->clone site
- 重点要勾选键盘记录(红色框框，不然web_log里看不到)
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-18%2009-48-40%20%E7%9A%84%E5%9B%BE.png)

clone之后，在win7机上打开
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/123456.png
)

- 如果受害者输入了用户名123，密码test123
- 我们可以在view中查看Web Log
![](https://raw.githubusercontent.com/alpha302/cloudimg/master/2019-10-18%2009-42-49%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)



