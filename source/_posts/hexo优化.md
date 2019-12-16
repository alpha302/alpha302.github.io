---
title: 主题美化
mathjax: true
copyright: true
comment: true
date: 2019-09-27 21:36:39
updated: 2019-10-2 18:16
tags: Hexo
categories: hexo
---
### 环境准备
- hexo3的版本
- next7的版本
- 部署好github

<!-- more -->

---

### 配置Hexo

#### 更换主题
```ruby
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
-theme: landscape
+theme: next
```

#### 站点信息
```ruby
# Site
title: Alpha的小站
subtitle: 一个自觉还有很多路要走的孩子，想做的更好。
description: 够努力才会越幸运
keywords: Linux,CTF,漏洞复现,环境搭建,工具使用
author: wang
language: zh-CN
timezone:

```

#### 仓库
```ruby
deploy:
  type: git
  repo: git@github.com:alpha302/alpha302.github.io.git
  branch: master 

```

#### 头像
```ruby
favicon:
  small: /images/favicon.ico
  medium: /images/favicon.ico
  apple_touch_icon: /favicon.ico
  safari_pinned_tab: /favicon.ico
  #android_manifest: /images/manifest.json
  #ms_browserconfig: /images/browserconfig.xml
```
#### 知识共享
```ruby
creative_commons:
  license: by-nc-sa
  sidebar: true
  post: true
  language: zh-CN
```

#### goole站点
登陆[goole网站站长]("https://www.google.com/webmasters/"),在“网址前缀”栏输入你的博客网址。验证所有权选择HTML标记，将content="x7LMhrHG*********************"复制到主题配置文件.
```ruby
google_site_verification: x7LMhrHG****************
```
#### 侧栏图标
```ruby
menu:
  home: / || home
  categories: /categories/ || th
  tags: /tags/ || tags
  archives: /archives/ || archive
  about: /about/ || user
```

#### 侧栏数目
```ruby
menu_settings:
  icons: true
  badges: true

```
#### 主题风格
```ruby
# Schemes
##scheme: Mist
scheme: Pisces
#scheme: Gemini
```
#### 移除next页脚
```ruby
powered:
  # Hexo link (Powered by Hexo).
  enable: false
  # Version info of Hexo after Hexo link (vX.X.X).
  version: true

theme:
  # Theme & scheme info link (Theme - NexT.scheme).
  enable: false
  # Version info of NexT after scheme info (vX.X.X).
  version: true
````
#### 图标链接

```ruby
social:
  GitHub: https://github.com/alpha302/alpha302.github.io.git || github
  E-Mail: mailto:howtime4096@gmail.com || envelope
  Telegram: https://t.me/howtime4096  || telegram
```
#### 大头像
```ruby
avatar:
  # In theme directory (source/images): /images/avatar.gif
  # In site directory (source/uploads): /uploads/avatar.gif
  # You can also use other linking images.
  url: /images/headicon.png
  # 圆角头像
  rounded: true
  # 不透明度
  opacity: 1
  # 鼠标指示旋转头像
  rotated: false
```
#### 收起文章详情
```ruby
auto_excerpt:
  enable: true
  length: 150
```
#### 文章统计，文字阅读时长
3步
```
$ npm install hexo-symbols-count-time --save
```

```ruby
# Post wordcount display settings                        主题配置文件
# Dependencies: https://github.com/theme-next/hexo-symbols-count-time
symbols_count_time:
  separated_meta: true
  item_text_post: true
  item_text_total: false
  awl: 4
  wpm: 275

```
```ruby
symbols_count_time:
  symbols: true
  time: true
  total_symbols: true
  total_time: true
```

#### 代码块
```ruby
codeblock:
  # Code Highlight theme
  # Available values: normal | night | night eighties | night blue | night bright
  # See: https://github.com/chriskempson/tomorrow-theme
  highlight_theme: normal
  # Add copy button on codeblock
  copy_button:
    enable: true
    # Show text copy result.
    show_result: true
    # Available values: default | flat | mac
    style: mac
```
#### back2top
```ruby
back2top:
  enable: true
  # Back to top in sidebar.
  sidebar: true
  # Scroll percent label in b2t button.
  scrollpercent: true

```
#### bookmark
```ruby
bookmark:
  enable: true
  # Customize the color of the bookmark.
  color: "#222"
  # If auto, save the reading progress when closing the page or clicking the bookmark-icon.
  # If manual, only save it by clicking the bookmark-icon.
  save: auto
```
#### 第三方插件
##### gitalk
在github上申请一个oAuth Apps 获取github_id和secret。
```ruby
gitalk:
  enable: true
  github_id: alpha302 # Github repo owner
  repo: gitment-comments  # Repository name to store issues
  client_id: xxxxx # Github Application Client ID
  client_secret: xxxxxx # Github Application Client Secret
  admin_user: alpha302 # GitHub repo owner and collaborators, only these guys can initialize gitHub issues
  distraction_free_mode: true # Facebook-like distraction free mode
  # Gitalk's display language depends on user's browser or system environment
  # If you want everyone visiting your site to see a uniform language, you can set a force language value
  # Available values: en | es-ES | fr | ru | zh-CN | zh-TW
  language: zh-CN
```
##### 不算子访客统计
```ruby
# 访客人数统计
busuanzi_count:
  enable: true
  total_visitors: true
  total_visitors_icon: user
  total_views: true
  total_views_icon: eye
  post_views: true
  post_views_icon: eye
```
##### 本地搜索
```ruby
local_search:
  enable: true
  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  trigger: auto
  # Show top n results per article, show all results by setting to -1
  top_n_per_article: 1
  # Unescape html strings to the readable one.
  unescape: false
  # Preload the search data when the page loads.
  preload: false
```
##### 动态文章背景
```
git clone https://github.com/theme-next/theme-next-three source/lib/three
# JavaScript 3D library.
# Dependencies: https://github.com/theme-next/theme-next-three
three:
  enable: true
  delay: false # Set true to further delay loading
  three_waves: false
  canvas_lines: false
  canvas_sphere: true
```
##### 点击出现爱心
复制页面中的代码，在路径blog/themes/next/source/js/src/中新建love.js文件，将复制的代码粘贴到该文件中。
```
/*网页鼠标点击特效（爱心）*/
!function (e, t, a) {function r() {for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (s[e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = "left:" + s[e].x + "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale + "," + s[e].scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");requestAnimationFrame(r)}function n() {var t = "function" == typeof e.onclick && e.onclick;e.onclick = function (e) {t && t(), o(e)}}function o(e) {var a = t.createElement("div");a.className = "heart", s.push({el: a,x: e.clientX - 5,y: e.clientY - 5,scale: 1,alpha: 1,color: c()}), t.body.appendChild(a)}function i(e) {var a = t.createElement("style");a.type = "text/css";try {a.appendChild(t.createTextNode(e))} catch (t) {a.styleSheet.cssText = e}t.getElementsByTagName("head")[0].appendChild(a)}function c() {return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"}var s = [];e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {setTimeout(e, 1e3 / 60)}, i(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), n(), r()}(window, document);
```
打开/blog/themes/next/layout/_layout.swig文件，在该文件的最后增加以下代码
```
<!-- 页面点击小红心 -->
<script type="text/javascript" src="/js/src/love.js"></script>
```
##### 添加看板娘
```
npm install --save hexo-helper-live2d
```

在站点配置文件下配置
```ruby
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-shizuku
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
  react:
    opacity: 0.7
```
[3种高配版](https://live2d.fghrsh.net/demo/1.4.2/autoload.html)

##### 增加站点运行时间
在/blog/themes/next/layout/_partials/footer.swig最后添加如下代码
```
<div id="days"></div>
<script>
function show_date_time(){
    window.setTimeout("show_date_time()", 1000);
    BirthDay=new Date("04/17/2017 15:13:14");//修改为自己的blog建站时间
    today=new Date();
    timeold=(today.getTime()-BirthDay.getTime());
    sectimeold=timeold/1000
    secondsold=Math.floor(sectimeold);
    msPerDay=24*60*60*1000
    e_daysold=timeold/msPerDay
    daysold=Math.floor(e_daysold);
    e_hrsold=(e_daysold-daysold)*24;
    hrsold=setzero(Math.floor(e_hrsold));
    e_minsold=(e_hrsold-hrsold)*60;
    minsold=setzero(Math.floor((e_hrsold-hrsold)*60));
    seconds=setzero(Math.floor((e_minsold-minsold)*60));
    document.getElementById('days').innerHTML="已运行"+daysold+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒";
}
function setzero(i){
    if (i<10)
    {i="0" + i};
    return i;
}
show_date_time();
</script>
```
#### 布局配置
##### 配置背景
```
blog\themes\next\source\css\_common\scaffolding\base
body {
  position: relative; // Required by scrollspy
  font-family: $font-family-base;
  font-size: $font-size-small;
  line-height: $line-height-base;
  color: $text-color;
  background:url(/images/background.png);
  background-repeat: no-repeat;
  background-attachment:fixed;
  background-position:50% 50%;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  -ms-background-size: cover;
  +tablet-mobile() { padding-right: 0 !important; }
  +desktop-large() { font-size: $font-size-medium; }
}
```
##### 圆角
- 主板块
blog\themes\next\source\css\_schemes\Pisces\_layout.styl
```
.content-wrap {
  float: right;
  box-sizing: border-box;
  padding: $content-desktop-padding;
  width: $content-wrap;
  background: rgba(255,255,255,0.5);
  min-height: 700px;
  box-shadow: 16px;
  border-radius: 16px;

  +tablet() {
    width: 100%;
    padding: 20px;
    border-radius: 16px;
  }
  +mobile() {
    width: 100%;
    padding: 20px;
    min-height: auto;
    border-radius: 16px;
  }
}
```
- 侧边
blog\themes\next\source\css\_schemes\Pisces\_sidebar.styl
```
.sidebar-inner {
  //padding: 20px 10px 0;
  box-sizing: border-box;
  width: $sidebar-desktop;
  color: $text-color;
  background: rgba(255,255,255,0.5);
  box-shadow: $box-shadow;
  border-radius: 16px;
  if (hexo-config('motion.enable') and hexo-config('motion.transition.sidebar')) { opacity: 0; }

  &.affix {
    position: fixed;
    top: $sidebar-offset;
  }

  &.affix-bottom {
    position: absolute;
  }
}

```

blog\themes\next\source\css\_common\components\back-to-top.styl
```
.back-to-top {
  visibility: hidden;
  margin: (20px - $sidebar-offset) -10px -20px;
  background: rgba(255,255,255,0.5);
  font-size: $b2t-font-size;
  opacity: $b2t-opacity;
  cursor: pointer;
  text-align: center;
  border-radius: 16px;
  &:hover { opacity: $b2t-opacity-hover; }

  +tablet-mobile() {
    hide() if not hexo-config('sidebar.onmobile');
  }

  &.back-to-top-on {
    visibility: visible;
    the-transition();
  }
}
```
blog\themes\next\source\css\_schemes\Pisces\_layout.styl
```
.sidebar {
  position: static;
  float: left;
  margin-left: -100%;
  width: $sidebar-desktop;
  background: rgba(255,255,255,0.5);
  box-shadow: none
  border-radius: 16px;

  +tablet-mobile() {
    hide();
  }
}
```
---
