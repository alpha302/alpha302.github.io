---
title: XML和XXE基础
mathjax: true
copyright: true
comment: true
date: 2019-09-29 10:54:40
tags: owasp
categories: owasp
---

### XML简介
- XML 被设计用来传输和存储数据。
- HTML 被设计用来显示数据。
<!-- more -->
---
### XML语法

####  所有XML都必须要有关闭标签。
```
<note> this's note example </note>
```
####  所有XML的标签对大小写敏感
XML 标签对大小写敏感。在 XML 中，标签 <Letter> 与标签 <letter> 是不同的。
必须使用相同的大小写来编写打开标签和关闭标签

```
<Message>这是错误的。</message>

<message>这是正确的。</message> 
```
####  XML的属性值必须加引号
```
<!-- wrong example -->

<note data=8/2/16/> </note>

<!-- right example -->

<note data="08/02/16"> </note>
```
####  在 XML 中， 5个实体引用来代替符号：

|实体引用 | 符号  | 中文解释 |
|  ----  | ----  | ----    |
| &it   | ＜    |  小于号  |
| &gt   | ＞    | 大于号   |
| &amp  | &     | 和号     |
| &apos |'      |单引号    |
| &quot |"      |双引号    |

---  
### XML结构
     - XML文档结构包括DTD文档类型定义和文档元素信息。
```
<?xml version="1.0" encoding="ISO-8859-1"?>     #第一行是 XML 声明   
<note>                                          #第二行根元素<note>
<to>George</to>                                 #3-6描述根的4个子元素（to,from,heading以及body）
<from>John</from>                   
<heading>Reminder</heading>
<body>Don't forget the meeting!</body>      
</note>                                         #最后闭合根元素<note>结束      
 ```
- XML DTD
 
    DTD全称是The document type definition，即是文档类型定义，可定义合法的XML文档构建模块。它使用一系列合法的元素来定义文档的结构。DTD 可被成行地声明于 XML 文档中，也可作为一个外部引用。

假如 DTD 被包含在您的 XML 源文件中，它应当通过下面的语法包装在一个 DOCTYPE 声明中：
```
<?xml version="1.0"?>
<!DOCTYPE note [
<!ELEMENT note (to,from,heading,body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body (#PCDATA)>
]>
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend</body>
</note>
```
DTD 位于 XML 源文件的外部，那么它应通过下面的语法被封装在一个 DOCTYPE 定义中
```
<?xml version="1.0"?>
<!DOCTYPE note SYSTEM "note.dtd">
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>

这是包含 DTD 的 "note.dtd" 文件：
<!-- note.dtd 
<!ELEMENT note (to,from,heading,body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body (#PCDATA)>
-->
```
---
###  DTD中的实体
实体是用于定义引用普通文本或特殊字符的快捷方式的变量。
- 实体引用是对实体的引用。
- 实体可在内部或外部进行声明。

####  内部实体声明
```
DTD 实例:

<!ENTITY writer "Donald Duck.">
<!ENTITY copyright "Copyright runoob.com">

XML 实例：

<author>&writer;&copyright;</author>
```
###  外部实体声明
```
DTD 实例:

<!ENTITY writer SYSTEM "http://www.runoob.com/entities.dtd">
<!ENTITY copyright SYSTEM "http://www.runoob.com/entities.dtd">

XML example:

<author>&writer;&copyright;</author>
```



---