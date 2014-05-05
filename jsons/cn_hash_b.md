百度web前端上海暑期实习电面一 
---------------

下午电话响起，一看是上海的，猜到可能是百度，也可能是推销的。。。。接起来果然是百度的，面试官很客气很nice，然后一堆您好您好后，我们就开始电面了。（小小吐槽一下，百度都投了快2个月，在他们官网投的，据说官网投很慢，内推和其他地方投的更快）

####第一个大问题：主要围绕JSON

>面试官问：你知道JSON吗？ 我说当然知道，也一直在用啊！

>那你说说你用JSON都干嘛的？ 我说主要用于数据存储和数据传输使用，然后知道还能用于跨域处理的JSONP，不过没有实际处理过。

>JSON的优势在哪？ 我说JSON可以直接对应JS的对象，方便数据操作，用起来很方便。然后JSON数据压缩的更好，相比于XML体积更小。（另：JSON支持数据类型更多，编写更方便等）

>JSON支持的数据类型有哪些？ 答这个的时候大脑短路了一下，没说全。我回答可以支持对象和数组。然后面试官说没有了？我说没啦。他说那字符串呢。好吧！我短路了，我说刚才不说了对象了吗？对象里肯定有字符串之类的啊！然后展开了下，字符串、数字型、布尔型、NUll型。注意不支持undefined型！

>JS原生的JSON的处理函数有哪些？ 两个常用的，JSON.stringify 和 JSON.parse

####第二个大问题：JS基础知识

>话说基础知识虽然简单，但是也是最容易记不清的，因为简单所以很容易忽略，记住要好好深入理解基础知识。

>javascript 的基本数据类型有哪些？ 数字型、字符型、布尔型、null、undefined、对象（另：null 和undefined 这个太容易忘了。。。。）

>JS中继承怎么实现？ 使用prototype。

>哪些数据类型有prototype属性？ 自带的object对象好像都有，如：Function型，Object型、Strin型。反正都是可以用来扩展的。但是用的比较多的就是function的。（这个好像不是答得很好）

>js闭包？ 好吧！这个问题我已经会了好久了，可是竟然没答好。哎。。。。所以说知道怎么一回事和能正确说出怎么一回事，明明是两码事。整理一下大概：JS闭包是指有权访问另一个函数作用域中的变量的函数。主要用于，保护函数内的变量安全，在内存中维持一个变量，实现私有方法。（扯远的话，还要说到作用域、垃圾回收机制等）在

Js的问题基本如上了，觉得jS回答的还行，对话也很愉快，面试官很nice，我回答错了会告诉我是神马，然后也会引导，面试过程像一个技术交流对话，期间经常他说一点，然后我马上扩展。整体还行，接下问CSS了。

####第三类问题：CSS相关

>css定位属性？position，可以取absolute、relative、fexed (static(默认)、inherit)

>position 中absolute 对应的谁定位？ 好吧，这个问题前几天我刚研究过，然后没用就给忘了，然后没回答好。正确是：对应于父级元素中的最近的一个定位元素进行定位。

>什么是定位元素？ 好吧，同上我研究过，可是不够深入，然后没有实际操作很深的定位，所以就给记混了。正确是：就是有设置过position为relative或者absolute的元素，默认的元素不是。若父级中没有则absolute相对于body进行定位。

>inline和block的区别？ 块级元素盒子扩展到与父元素同宽，总是在新行上开始，所有盒模型属性可控。行内元素，会收缩与内容同宽，和其他元素在一行上，盒模型不可控制。inline-block将对象呈递为内联对象，将对象内容作为块级对象呈递。就是相对于inline，可以控制盒模型。

CSS大概就问了这些，其中还有一些小讨论之类的。CSS答的不好，可以说很差吧。虽然自己CSS写的还行，不过一直都没有深入研究过CSS的各个细节，后期需要继续学习努力！基础是王道。

####第四类问题: 关于学习等。

>学习一个新的知识的方法？ 答得时候比较零碎，基本我是这么学习一个新的东西的，首先按照官方文档或者其他人的分享做一个简单的demo，做demo可以快速的让我们知道新的东西是啥，有啥特性等等。然后做完demo后，要是有专业的书籍，可以大致看一下（主要是奠定些基础），然后看官方文档，还有一些人的分享（文档视频之类的），根据自己的项目进行规划，开始做，边做边研究（最开始可是做出来的不是很好，但是只要完整做好后，就基本都能知道新东西的所有特性了，然后以后就可以写了）

>和别人合作时遇到争执怎么处理，比如遇到别人不同意你的方案怎么处理？ （省略）

####其他问题：基础算法、还有其他扩展。

>快速排序和堆排序的区别？（不说了，我听到时大脑再一次短路了，然后就说错了。。。啥也不说了。。我看书去。。。这个问题比较靠前，所以突然来一下不是前端的，瞬间蒙了）

>2的N次方运算算法，自己写？这个回答的还行。

>用过PHP不？ 用过，大三写个论坛，不过之后都没用了。。。。（百度用PHP多）

####最后：轻松对话

>我问去实习的话是哪个部门？ 百度知心电商，之前有同学说过。

>实习要多久？希望三个月。然后我说我得和导师商量，得他批准。然后就没有然后了。