HTML head 标签解构
-------------------------

前几天和师兄聊天，师兄提醒要关注细节，他在去年面试时就head 标签中的内容被问题很久，head？有那么多内容吗？特意查缺补漏后整理如下。

>head 位于网页头部，以``<head></head>``包含中间的内容

####head中可以放得内容

#####1. title 
唯一，页面标签，SEO时很重要，它也是head中唯一一个必须的元素。

#####2. base

定义页面的基准，之前没有关注过。``<base href="http://www.w3school.com.cn/i/" /> `` base定义了网页中的基准，可以设计网页中的链接或者目标默认的基准（就是默认地址前缀），会对target 和 href 中内容添加前缀地址。

>如``<a href="sss.html"></a>``,base设定如上，则实际的href值为``www.w3school.com.cn/i/sss.html``。在XHTML中base需要被正确关闭。

#####3. link 

link是一个链接标签，包括css文件的引用、favicon.ico图标的引用。
>rel 表示当前文档与被链接文档之间的关系，``rel="stylesheet"，``表示为样式。``rel="dns-prefetch"``表示DNS预获取，属于前端优化的一部分，加快解析速度。默认情况下浏览器会对页面中和当前域名不在同一个域的域名进行获取并缓存，可是假如你想对页面中没有出现的域名进行预获取，就需要使用这个标签。如淘宝首页``<link rel=”dns-prefetch” href=”http://a0.twimg.com”/>``

>注： rel不能省略，type可以省略，media表示使用媒介、type表示文本格式、、

#####4. meta

meta包含广泛的内容标签，如页面关键字、网页介绍、作者、页面编码、robots、自动跳转等声明及说明标签。

>比如``<meta http-equiv="charset" content="iso-8859-1">``，html建议charset直接使用``<meta charset="utf-8">``这种形式，其他也较少使用，``content-type``默认为``text/html``。

``<meta>``还可以用来关联一些信息，如keywords，还可以用来设置vieport等

>比如淘宝首页
``<meta name="description" content="淘宝网 - 亚洲最大、最安全的网上交易平台，提供各类服饰、美容、家居、数码、话费/点卡充值… 8亿优质特价商品，同时提供担保交易(先收货后付款)、先行赔付、假一赔三、七天无理由退换货、数码免费维修等安全交易保障服务，让你全面安心享受网上购物乐趣！">``

>手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。移动版的 Safari 浏览器最新引进了 viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放，其他手机浏览器也基本支持。
``<meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″>`` 相对应用于设置移动设备的浏览器解析。
initial-scale表示初始缩放比例，maximum-scale 表示最大缩放比例，比如淘宝就是上面那样设置的，所以一进入是就是全比例，且不能在放大。

#####5. script

script是引入外部js文件作用，

1. 如果使用 async：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
2. 如果不使用 async 且使用 defer：脚本将在页面完成解析时执行，相当于立即下载，延迟执行。
3. 如果既不使用 async 也不使用 defer：在浏览器停止解析页面，立即读取并执行脚本。

对于async，这个是html5中新增的属性，它的作用是能够异步的加载和执行脚本，不因为加载脚本而阻塞页面的加载。但是有一点需要注意下，在有async的情况下，js一旦下载好了就会执行，所以很有可能不是按照原本的顺序来执行的。如果js前后有依赖性，用async，就很有可能出错。

关于defer和async 可参考 <a href="http://ued.ctrip.com/blog/?p=3121 ">http://ued.ctrip.com/blog/?p=3121 </a>


转载注明出处：chenhui5416.duapp.com


