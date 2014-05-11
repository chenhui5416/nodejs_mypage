读书笔记 ： Function 类型笔记
--------------------------

重读自己的手写笔记，将一些内容迁移到博客中。

>JS中函数实际是对象--ECMASCRIPT。每个函数都是Function类型的实例，而且都与其他引用类型一样基友属性和方法。

函数名仅仅是指向函数的指针，因此函数名与包含对象的指针的其他变量没有什么不同，也就是说一个函数可以有多个名字。

TIP1：	JS中函数没有重载，后定义的重名函数会覆盖前面的函数（因为没有函数签名）

TIP2：	函数声明可以先使用后定义（因为声明会提升）

TIP3：	函数表达式必须先定义后使用（因为变量声明提升）

####函数内部属性

>两个特殊对象：``arguments``， ``this``

1. ``arguments``类数组对象，返回输入的函数参数，可以使用``Array.prototype.slice.call(arguments,0)``将其转化为数组。

2. ``arguments.callee`` 指向本函数的一个指针（当使用函数递归时可以使用它在内部代替函数，解耦。不过严格模式会出问题，所以最好使用命名函数代替。）

3. ``this`` 引用的是函数据以执行的环境对象。

4. ``caller`` 保存调用 当前函数/ 的函数的引用。

>函数的属性和方法  ``function fn(a,b){···}``

1. ``length``,表示函数期待接收的命名参数个数，fn.length //2

2. ``prototype``

3. ``apply`` 第一个参数为准备执行函数的作用域，第二个参数为 函数 参数数组

4. ``call`` 第一个参数同上，其余参数接收 函数参数


####ES5 bind方法

这个方法创建一个函数的实例，使其this值会被绑定到传入``bind()``函数的值

>相当于新创建了一个函数，这个函数的this指向传入的对象，原函数不变，如下：

	var temp = "global";
	var local = {
		temp: "local"
	}
	function test(){
		console.log(this.temp); 
	}
	var bindTest = test.bind(local)
	test();        //输出global
	bindTest();    //输出local

>注：bind只是绑定了this值,若上述代码改为``console.log(temp)``则两个输出都为global

转载注明出处：chenhui5416.duapp.com
