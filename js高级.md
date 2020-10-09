## 面向对象思维

##### 面向对象 :  封装性  继承性  多态性

### 对象

#### 万物皆对象 对象是一个具体的事物

对象中包含 **属性**( 事物的特征)  **方法**  (事物的行为)

##### 在javascript中 对象是一组无序的相关属性和方法的集合  所有事物都是对象

**对象**  特指某一个    通过实例化一个具体的对象



### 类

`ES6 ` 中 新增了 **类**  的概念 

可以使用  **class**   关键字声明  一个 **类**  之后用这个  **类**  来 `实例化对象`

**类**  抽象了对象的 `公共部分`  泛指某一大类 (  **class**  )



##### 1.  创建类  class

- 类  里面的共有属性 放到  constructor
- 构造函数  接受传递的参数  返回实例

##### 2. 利用类创建对象

- **new**  调用  自动执行 `constructor `  函数    

类的执行顺序  **new** -->  **constructor**  -->  实参  -->  形参  --> 属性(方法)



###### 注意点 :

-  通过 **class**  关键字创建类   `类名`  习惯定义 **首字母大写**     类名后面 不要加小括号 `
-  类里面有个 **constructor ** 函数  可以接受传递过来的参数   同时  **返回实例对象 **
-  **constructor  **函数 只要 `new `命名生成对象实例时, 自动调用 这个函数   `如果不写这个函数  类也会自动生成这个函数` 
-  生成实例  `new 不能省略  ` ` 类名后面要加小括号 `
-  `类里面的所有函数  不需要写 function 关键字  `  `多个函数 方法之间不需要  添加 , 隔开 `

```js
<script>    
      // 1. 创建类 class 
      class Star {
        // 类 里面的共有属性 放到 constructor
        // 构造函数  接收传递的参数   返回实例
         constructor(uname, age) {
             this.uname = uname;
             this.age = age;
         }
         //  添加方法
         sing(song) {
         	console.log(this.uname + song);
         }
     }

     // 2. 利用类创建对象 new   
     // new  调用   自动执行 constructor 函数
     var ldh = new Star('刘德华', 18);   
     console.log(ldh);
     var zxy = new Star('张学友', 20);
     console.log(zxy);
	 ldh.sing('冰雨');
     zxy.sing('李香兰');
```



##### 类的继承

- **extends   子类 继承  父类 **
- **super  子类 调用 父类中的函数  ** **必须在  子类 this之前调用**

```
class Father {
            constructor(x, y) {
                this.x = x;
                this.y = y;

            }
            money() {
                console.log(100);
            }
            sum() {
                console.log(this.x + this.y);
            }
        }
        class Son extends Father {
            constructor(x, y) {
                // super 必须在  子类 this之前调用
                super(x, y); // 调用父类中的构造函数
                this.x = x;
                this.y = y
            }
            subtract () {
                console.log(this.x - this.y);
            }
        }
        let son = new Son(5, 8);
        son.money();
        son.sum(1, 5);
```

##### super 关键字

- 继承中的属性或者方法查找原则  就近原则 
- super 关键字 调用 父类 普通函数 



### ES6 中 类和对象 三个注意点

##### 在 ES6中 类没有变量提升 必须先定义类 才能 通过类实例化对象 

- ***constructo*r ** 里面的  **this **  指向的是 创建的实例对象 

#####  类里面 的共有属性和方法 一定要加 this 使用



##### 类里面 this 的指向问题

`constructor 里面的 this 指向的是 创建的实例对象 `

`方法里面的 this 指向 方法的调用者 `



```js
<button>点击</button>
    <script>
        var _that;
        class Star {

            // constructor 里面的 this 指向的是 创建的实例对象
            constructor(uname, age) {
                that = this;
                console.log(this);  //Star
                this.uname = uname;
                this.age = age;

                // sing();  // 报错
                this.sing();  // hi


                this.btn = document.querySelector('button');
                // 加小括号直接调用    不加就是点击才调用
                this.btn.onclick = this.sing;
            }
            sing() {
                // console.log(uname) // 报错

                // 这个 sing 里面的 this 指向 btn 按钮 因为这个 按钮 调用了函数
                
                console.log(this);  // this指向 btn   <button>点击</button>

                console.log(this.uname); // undefined

                console.log('hi');

                console.log(that.uname); // 刘德华
            }
            dance() {
                _that = this;
                console.log(this);
            }
        }

        let ldh = new Star('刘德华');
        console.log(ldh)  // Star
        ldh.sing();  // hi
        console.log(that === ldh);  // true
        console.log(_that === ldh);  // false
        ldh.dance();    // Star
        console.log(_that === ldh);  // true
</script>
```









## 面向对象和原型



#### 利用构造函数创建对象

**1 .  利用 new Object ()  创建对象**

```js
var obj = new Object();
```



**2 . 利用字面量创建对象 **

```js
var obj = {};
```



**3 . 利用构造函数创建对象**

```js
       function Star(uname, age) {

            this.uname = uname;
            this.age = age;
            this.sing = function() {
                console.log('我会唱歌')
            }

        }

        var ldh = new Star('刘德华', 18);
        console.log(ldh);   // Star
        var zxy = new Star('张学友', 19);
        ldh.sing();  // 我会唱歌
        console.log(zxy);   // Star
        zxy.sing();  // 我会唱歌
```

##### new 在执行的时候 会做四件事情

- 在内存中 创建一个新的空对象
- 让 this 指向这个新的对象
- 执行构造函数里面的代码  让这个新对象添加属性和方法
- 返回这个新对象  (所以构造函数  里面不需要 return)



##### 静态成员和实例成员

**实例成员  构造函数 内部 通过 this 添加的成员  实例成员只能通过 实例化对象访问**

**静态成员 通过 构造函数本身在外部添加的成员   静态成员只能通过 构造函数访问**

```js
// 构造函数 的属性和方法 我们称为成员  成员可以添加
        function Star(uname, age) {

            this.uname = uname;
            this.age = age;
            this.sing = function () {
                console.log('我会唱歌')
            }

        }

        var ldh = new Star('刘德华', 18);

        // 1.  实例成员  构造函数 内部 通过 this 添加的成员  uname age sing 就是实例成员
        // 实例成员只能通过实例化对象 来 访问
        console.log(ldh.uname);
        ldh.sing();

        // console.log(Star.uname); // undefined   // 不能通过构造函数访问实例成员

        // 2. 静态成员 在构造函数 本身添加的成员
        Star.sex = '男';
        ldh.money = 20;
        console.log(ldh);
        console.log(ldh.money)
        console.log(Star.money) // undefined  实例化对象添加 不能通过构造函数访问
        // 静态成员只能通过构造函数访问
        console.log(Star.sex);
        //  console.log(ldh.sex);  // undefined   // 不能通过对象来访问
```



### 原型

- 公共属性放到构造函数里面
- 公共的方法放到 原型对象里 prototype
- 不需要开辟空间
- 复杂数据类型 比较地址   



##### 构造函数原型

- 构造函数 通过原型分配的函数是所有对象共享的
- **javascript 规定  每一个构造函数都有一个  prototype 属性   指向另一个对象**
- prototype  就是一个对象  这个对象里面的所有 属性和方法  都会被构造函数所拥有
- 可以把不变的方法  直接定义到  prototype  对象上   所有对象的实例就可以共享这些方法

```js
function Star(uname, age) {
            this.uname = uname;
            this.age = age;
            /* this.sing = function () {
                console.log('我会唱歌')
            } */
        }
        // 原型对象
        Star.prototype.sing = function () {
            console.log('我会唱歌')
        }
        var ldh = new Star('刘德华', 18);
        var zxy = new Star('张学友', 19);
        // 比较 两个函数的地址 
        console.log(ldh.sing === zxy.sing);  // true
        ldh.sing();
        zxy.sing();
        console.dir(Star);
```



##### 对象原型

- 对象添加原型   指向构造函数的原型对象
- 对象  系统 添加一个  __proto__  指向构造函数的原型对象
- 对象原型 和  构造函数里面的  原型对象 等价的



###### 方法查找规则

1. 查找实例对象是否有  sing 方法
2. 如果存在  就执行对象上的  sing
3. 如果不存在  因为有  __proto__  存在
4. 就去构造函数原型对象  prototype 查找



```js
function Star(uname, age) {
            this.uname = uname;
            this.age = age;
            /* this.sing = function () {
                console.log('我会唱歌')
            } */
        }

       // 原型对象
        Star.prototype.sing = function () {
            console.log('我会唱歌')
        }
        var ldh = new Star('刘德华', 18);
        var zxy = new Star('张学友', 19);
        // 比较 两个函数的地址 
        console.log(ldh.sing === zxy.sing);  // true
        ldh.sing();
        zxy.sing();
        console.dir(ldh);   
        console.log(ldh.__proto__ === Star.prototype);  // true
```





##### constructor 构造函数

###### 对象原型 (__proto__)  和 构造函数原型对象 (prototype)  里面都有一个    constructor 属性

- constructor   称为 构造函数    指回构造函数本身
- constructor   用于记录对象引用 于哪个函数  可以让原型对象指向原来的构造函数

### 原型链

###### 只要有对象就有 `__proto__` 原型   指向原型对象

###### 构造函数原型对象里面的 `__proto__` 原型 指向 Object.prototype

###### Object 原型对象  里面的  `__proto__` 原型 指向 null



####  原型对象 this 指向

- 构造函数中的this  指向对象实例  ldh
- 原型对象中的this  指向实例对象  ldh

```js
function Star(uname, age) {
            this.uname = uname;
            this.age = age;
        }
        var that;
        Star.prototype.sing =function() {
            console.log('我会唱歌');
            that = this;
        }
        var ldh = new Star('刘德华', 18);
        // 1. 在构造函数中 this  指向对象实例
        ldh.sing();
        // 2. 原型对象 里面this  指向实例对象
        console.log(that === ldh); // true
```



##### 扩展内置对象

- 数组 和 字符串 内置对象  不能给原型对象 覆盖操作''
- 只能通过点语法追加的形式



### 原型简单总结 :

###### 公共属性放到构造函数里面

###### 公共的方法放到 原型对象里  prototype 

###### 构造函数 通过原型分配的函数是所有对象共享的 

###### javascript 规定  每一个构造函数都有一个  prototype 属性   指向另一个对象 

###### prototype  就是一个对象  这个对象里面的所有 属性和方法  都会被构造函数所拥有 

###### 对象添加原型   指向构造函数的原型对象 

###### 对象原型 (__proto__)  和 构造函数原型对象 (prototype)  里面都有一个    constructor 属性  指向构造函数本身 

###### 只要有对象就有 `__proto__` 原型   指向原型对象 构造函数原型对象里面的 `__proto__` 原型 指向 Object.prototype  

###### Object 原型对象  里面的  `__proto__` 原型 指向 null



#### 继承

```js
		function Father(uname, age) {

            // this 指向  父构造函数的对象实例

            this.uname = uname;
            this.age = age;
        }
		// 直接赋值   如果修改 子原型对象 父原型对象也会被修改
        // Son.prototype = Father.prototype;

 		Son.prototype = new Father();
        // 如果利用对象 形式 修改了 原型对象  用 constructor 修改原来的构造函数
        Son.prototype.constructor = Son;

	  	// 2.子构造函数
        function Son(uname, age, score) {

            // this 指向  子构造函数的对象实例
            //  改变 this 指向 第一个参数
            Father.call(this, uname, age);
            this.score = score;

        }
```







## ES6 新增方法



#### 对象新增方法

**Object.defineProperty**   (**obj**,  **prop**,   **descriptor**)    定义新属性或修改原有属性

- `obj`  目标对象
	 `prop` 需定义或修改的属性名字	
- `descriptor ` 目标属性所拥有的特性  以对象形式传入  (**value** ||**writable** ||**enumerable** ||**configurable**)
  - value  设置属性值  默认 undefined
  - writable 值是否可以默认重写 true || false  默认 false
  - enumerable  目标属性是否可以被枚举  true || false  默认 false
  - configurable  目标属性是否可以被删除或者 `descriptor`  再次修改特性 true || false  默认 false



#### 字符串新增方法

###### trim()  去除字符串两侧空格





#### 数组新增方法



##### forEach ( callback ( currentValue  [ ,  index  [ , array ] ] )[,  thisArg])

##### filter  ( callback ( currentValue  [ ,  index  [ , array ] ] )[,  thisArg])

##### some  ( callback ( currentValue  [ ,  index  [ , array ] ] )[,  thisArg])

##### every  ( callback ( currentValue  [ ,  index  [ , array ] ] )[,  thisArg])

##### map ( callback ( currentValue  [ ,  index  [ , array ] ] )[,  thisArg])

- `callback`  每个数组元素执行的函数    接收 1 - 3 个参数
- currentValue  数组中正在处理的当前元素
- index  数组中正在处理当前元素的索引号
- array   forEach 方法 可操作的数组
- 当执行回调函数 `callback` 时，用作 `this` 的值。 



##### forEach  数组迭代   filter 数组筛选  some  数组查找  every  数组判断  map 数组元素判断

##### 无返回值    返回数组元素数组   返回  布尔值      返回 布尔值    返回布尔值数组



###### forEach 无返回值 (undefined)  不会改变原数组  不会终止迭代

###### filter 返回一个新数组  新数组元素是符合要求的原数组元素 不会改变原数组 不会终止迭代

###### some 返回布尔值 查找满足条件的第一个元素  会终止迭代  用于检测是否满足指定条件 传入空数组 直接返回 false

###### every 返回布尔值 数组内每个元素 满足条件 返回true  否则返回false 传入空数组 直接返回 true 不会修改原数组

###### map 返回一个新数组  新数组为原数组每一个元素返回值(布尔值) 可以做判断条件  也可以进行计算  不修改原数组





## 函数

#### 函数的定义方式

##### 1. 自定义函数 (命名函数)

```js
function fn() {}
```

##### 2. 函数表达式

```js
var fn = function () {}
```

##### 3. 利用 new Function() 创建函数

```
var fn = new Function()
```

##### 所有函数 都是 Function 构造函数的实例(对象)

- ###### 构造函数里 Function.prototype 指向 Function 的原型对象

- ###### Function 的原型对象.constructor  指向 Function 构造函数

- ###### 构造函数 Function 指向  实例对象

- ###### 实例对象 的 __proto__ 指向 Function 原型对象



#### 函数的调用方式 

#### 函数 this 指向问题

##### 1. 普通函数

```js
function fn() {}
fn();   // this 指向调用者
fn.call();  // 会改变 this指向 
fn.apply(); // 会改变 this指向 (call apply this问题 接下来笔记会有)
```

##### 2. 对象的方法

```js
var obj = {
    sayHi : function() {}
}
obj.sayHi(); // this 指向这个 对象
```

##### 3. 构造函数

```
function Star() {}
new Star();  // this 指向 实例对象
```

##### 4. 绑定事件函数

``` {js
event.eventType = function(){}
// 触发事件调用  // this 指向 函数调用者 
```

##### 5. 定时器函数  回调函数

```js
setInterval(function() {}, value)
// 定时器自动 value 调用  // this 指向 winodw
```

##### 6. 立即执行函数

```
(function(){})();
// 自调用函数  // this 指向 window
```

###### 匿名函数的 this  指向 window



####  call,    apply,    bind 三者的区别

##### 1. call (thisArg  [, arg1[, arg2[, ...]]])               

###### 接收的是参数列表             this 指向改变为 thisArg           调用函数                (常用作继承)



##### 2. apply (thisArg,  [argsArray] )

###### 接收的是参数数组         this 指向改变为 thisArg             调用函数                  (常与数组一起操作,例如:求最大值)



##### 3. bind (thisArg   [, arg1[, arg2[, ...]]])

######   不调用函数  创建一个新函数       this 指向 thisArg    返回原函数 this 改变之后的新函数              (常用作只改变 this 指向  例如 改变 定时器 this 指向)



### 严格模式

#### 开启严格模式

##### 整个脚本开启严格模式

```js
<script>
	// 第一种方法
    'use strict' || "use strict"
</script>
<script>
	// 第二种方法
    (function() {
    'use strict' || "use strict"
	})()
</script>
```

##### 函数严格模式

```js
function fn() {
    
}
function fun() {
    'use strict' || "use strict"
}
```



#### 严格模式对 javascript 语法和行为的部分改变

###### 开启严格模式后 :

- **变量规定 : **
  1.   `变量必须声明  然后再使用`
  2.   严禁删除 已经声明的变量
- **this 指向问题 : **
  1.   全局作用域下函数的  this 是   undefined
  2.   构造函数  不使用 new 实例  函this  是undefined
  3.   定时器 this 依旧指向  window  
  4.   事件对象  this 依旧指向 调用者
- **函数变化 : **
  1.  函数不能有重名函数
  2.  函数声明再顶层  不允许再非函数的代码块内声明函数 ( if  for )



####  高阶函数

##### 高阶函数定义  对其他函数进行操作的函数   接收函数作为参数 (回调函数)  或者 函数作为返回值输出



#### 闭包

##### 1.  变量作用域 (全局作用域 和 局部作用域)

- 函数内部  可以使用 全局变量
- 函数外部 不可以使用 局部变量
- 函数执行完毕  本作用域内的局部变量会销毁

##### 2. 闭包含义 :  从一函数作用域 访问 另外一个作用域的变量               变量所在的作用域 就是闭包函数

##### 3. 闭包的作用 : 延伸了变量的作用范围

`案例1`

```js
 // 闭包应用 - 点击 li 输出 当前 li 的索引号
        // 1. 动态添加属性的方式
        var lis = document.querySelector('.nav').querySelectorAll("li");
        /* for(var i = 0;i < lis.length;i++) {
            lis[i].index =i ;
            lis[i].addEventListener("click", function() {
                // console.log(i);
                console.log(this.index)
            })
        } */
        // 利用闭包的方式 得到当前小 li 的索引号
        for(var i = 0;i < lis.length;i++) {
            // 利用 for 循环 创建 4 个立即执行函数
            // 立即执行函数 也成为 小闭包 因为立即执行函数里面的任何一个函数 都可以 使用它的 i 这变量
            
            // 等到点击事件结束之后才会 销毁变量  会导致内存泄漏
            (function(i) {
                lis[i].addEventListener('click', function() {
                    console.log(i);
                })
            })(i)
        }
```

`案例2`

```js
 // 闭包应用 - 3秒之后  打印所有 li 元素里面的内容
        var lis = document.querySelector('.nav').querySelectorAll("li");

        for(var i = 0;i < lis.length;i++) {
            (function(i) {
                setTimeout(function() {
                    console.log(lis[i].innerHTML)
            }, 3000);
            })(i)
        }
```

`案例3`

```js
 // 闭包应用 - 计算打车价格
        // 用户输入公里数 计算打车价格
        // 出现拥堵情况  多收取 10 块钱拥堵费
       /*  function fn() {
        }
        fn(); */
        var car = (function(){
            var start = 13;  // 起步价  局部变量
            var total = 0;   // 总价    局部变量
            return {
                // 正常总价
                price : function(n) {
                    total = Math.abs(n) <= 3 ?  start : start + (Math.abs(n) - 3) * 5;
                    return total;
                }, 
                // 拥堵之后的费用
                yd : function(flag) {
                    return flag ? total + 10 : total;
                }    
            }
        }) ()
```



#### 递归

##### 1. 递归含义 :  一个函数在内部可以调用其自身  这个函数就是递归函数

##### 2.  递归的作用和循环效果一样

###### 递归容易发生 "栈溢出" (stack overflow)  必须要加退出条件 return



#### 浅拷贝和深拷贝

##### 浅拷贝只是拷贝一层  更深层次对象级别的只拷贝引用  复杂数据只拷贝地址

###### Object.assign(拷贝对象, 被拷贝对象)

```js
var obj = {
            id: 1,
            name: 'andy',
            msg: {
                age: 18
            },
            color: ['pink', 'red', 'red', 'purple']
        }

        var o = {};

        k 属性名  obj[k]属性值
        for (var k in obj) {

            o[k] = obj[k];
        }

        console.log(o);
        console.log(o.msg.age);
        o.msg.age = 20;
        o.id = 20;
        console.log(obj);

        // console.log("=====================================");

        // 浅拷贝语法糖写法
        /** 
        *   Object.assign(拷贝对象, 被拷贝对象);
        */

        // Object.assign(o, obj);
        // console.log(o);
```



##### 深拷贝拷贝多层  每一级别的数据都会拷贝

```js
        // 使用  函数递归   完成  深拷贝
        function deepCopy(newObj, oldObj) {
            // 遍历 被拷贝的对象
            for (var k in oldObj) {
                // 声明一个变量  接收被拷贝对象的值
                var item = oldObj[k];
                // 判断 获取到值是否有复杂数据类型
                if (item instanceof Array) {
                    // 如果存在数组 拷贝对象的属性 类型 数组
                    newObj[k]  = [];
                    // 复杂数据类型就 递归
                    deepCopy(newObj[k], item);
                } else if (item instanceof Object) {
                    // 如果存在数组 拷贝对象的属性 类型 对象
                    newObj[k] = {};
                    // 复杂数据类型就 递归
                    deepCopy(newObj[k], item)
                } else {
                    // 如果为简单数据类型 直接拷贝
                    newObj[k] = item;
                }
            }
        }
        deepCopy(o, obj);
        console.log(o);
        o.msg.age = 20;
        console.log(obj);
```









## 正则表达式













## ES6