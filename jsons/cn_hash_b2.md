百度web前端上海暑期实习电面二 
---------------

百度实习电面二来了，中午时间，大脑短路更厉害。早上还想着要好好复习一下基础知识，结果。。。还没复习就被虐了。。好惨好惨啊。。。虽然被虐了，面试官还是很nice的。

###第一类题目:代码类
>1.实现一个indexOf函数，indexOf('abcd','bc'),输出1

	function indexOf( str, substr) {
	 	var strLen = str.length,subLen = substr.length; 
 		var strPoint = 0,subPoint = 0;
  		if(subLen > strLen) {
  			return -1;
  		}
  		for (strPoint; strPoint<strLen; strPoint++){
    		if (str[strPoint] == tar[subPoint]){
      			subPoint++;
      			if (subPoint == subLen){
        			return (strPoint-subPoint+1) ;
      			} 
    		} else {
      			strPoint = strPoint-subPoint;
      			subPoint = 0;
    		}
 		}
  		return -1;
 	}
 	var aa = indexOf('abcd', 'cd');
 	console.log(aa)
这道题目不是很难，可是我做了比较久，第一次写的时候太激（紧）动（张）了，毕竟第一次面试要求直接手写代码，而且面官直接看着你写。要是给我打个草稿啥的，可能写的快多了。（PS：面试官说写的很奇葩，其实我也觉得，不容易看懂，可以转化为双循环来写，这样看着更舒服）。

这个实现还说了一个怎么使用"abc".indexOf("ab");这样调用，我说在String原型中加代码就好。其他方法没想到。

>2.一道闭包的题目

其实我应该答对的，结果我答错了。。细节啊！所以继续看书去吧！

	function F() {
    	var f = [];
    	for (var i = 0; i <= 2; i++) {
      	  	f[i] = function() {
            	console.log(te)
        	}；
    	};
    	return f;
	}

	var f = F();

	for (var i = 0; i < f.length; i++) {
    	f[i]();
	};
问上面的代码输出结果，一开始我答对思路，被说一下就不坚定了，答案是3,3,3。因为在触发时，局部变量i = 3了。这和js函数作用域有关，作用域在函数定义时绑定，同时还涉及到闭包，因为返回了一个函数列表，所以这样i是被保存的，再调用时i存在，且为3。

>3.接上面问题，怎么让它输出为0,1,2呢。

	function F() {
    	var f = [];
    	for (var i = 0; i <= 2; i++) {
      	  	f[i] = function() {
          		var te = i;
          		return function(){
            		console.log(te)
          		}
        	}()；
    	};
    	return f;
	}

	var f = F();

	for (var i = 0; i < f.length; i++) {
    	f[i]();
	};
答案如上，就是加了个闭包。不过我竟然想了几分钟吧！其实应该马上答出来的，真的比较基础，所以面试代码手写能力还是很弱！

###第二类问题：JS相关 CSS

>1.事件机制

没回答好，基础不够扎实，其实应该是很简单的题目！

事件分为捕获事件和冒泡事件，捕获事件就是从顶级（最外层）开始捕获事件，然后一层层往下传，直到发生事件的target为止。冒泡事件则是反过来，从触发事件的target开始触发，然后层层往上触发。iE是不支持捕获事件的。

在具体实现时只要将addEventListener的第三个参数设为true就好。

>2.Ajax和JSONP的差别

语言组织不好，另外也没回答好，毕竟用的不多，研究也不深入。

Ajax原生实现就是使用XMLHttpRequest，不能跨域。JSONP是程序员们想出来的高端跨域方法，就是使用出入``<script>``标签进行跨域。重要应该是使用的技术手段不一样，就是上面说的。我回答的是跨域，不过Ajax也可以通过服务器代理进行跨域。在具体的库中Jquery把JSONP包含在Ajax中了，可是JSONP理论上不是Ajax，不一样。

>3.给一个url怎么获得数据部分，怎么匹配到具体的查询值

我知道可以通过location.href 获得url，可以通过location.hash获得哈希值，就是忘了查询字段是用location.search获得，好吧（最后面试官直接告诉我）。然后我就说我忘了，我说我知道有原生的，不过可以做字符串匹配获得。

接上面问题，他说怎么获得其中特定的值。我继续说字符串匹配。他不满意，然后说你知道正则不，额。。。我当然知道，我怎么就给忘了可以用正则，不过我正则很弱，每次写都要现查。然后就叫我说下思路，没说好。

>4.浏览安全问题，知道csrf吗？

没涉及过，写的项目都没考虑过，也觉得没人这么无聊搞我的网站，我说了DNS攻击，他说前端，我说不知啊。然后就告诉我csrf了。

查了下，{来自百度百科}CSRF（Cross-site request forgery跨站请求伪造，也被称为“one click attack”或者session riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。尽管听起来像跨站脚本（XSS），但它与XSS非常不同，并且攻击方式几乎相左。XSS利用站点内的信任用户，而CSRF则通过伪装来自受信任用户的请求来利用受信任的网站。与XSS攻击相比，CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比XSS更具危险性。

>5.get和post的差别

没回答好！答案网搜一下就出来一堆了。

6.float的原理

蒙了，没答好。CSS弱鸡的本色继续体现出来了。。。后来在群里问，瞬间知道那么多东西，先补习！再解决。

7.盒子模型

这个简单，不过浏览器兼容方面说的不好。还有就是新属性没说对。

###第三类：其他相关问题：有点记不清了，好像问题还是有几个

>1.git head 是干嘛的。

当他说你用过SVN吗？我说没有。当说问个git问题吧，我说好呀。我还有点高兴，git基本操作都杠杠的。。。结果听到问题就内流满脸。

后查详细：现在的问题是，当你执行 git branch (分支名称) 这条命令的时候，Git 怎么知道最后一次提交的 SHA-1 值呢？答案就是 HEAD 文件。HEAD 文件是一个指向你当前所在分支的引用标识符。这样的引用标识符——它看起来并不像一个普通的引用——其实并不包含 SHA-1 值，而是一个指向另外一个引用的指针。（来自：<a href="http://git-scm.com/book/zh/Git-内部原理-Git-References">http://git-scm.com/book/zh/Git-内部原理-Git-References</a>

也就是说，head 指本分支最后的commit，可以通过reset head跳回之前的commit 之类的，我好像还用过。。。囧。。。

>2.其他不记得了

###其他

每次面试都有很大的收获，查缺补漏！
