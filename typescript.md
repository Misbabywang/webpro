# TypeScript

### 安装
yarn global add typescrpt

 -   将 ts 转换为 js

tsc --init          //  初始化 typescript
tsc fildName        //  需要转换的文件

 -   自动转换为 js

 vscode --> 终端 --> 运行生成任务 --> tsc 监视 --> tsconfig.json --> outDir 转换到 ./js 文件中


## TypeScript 数据类型

 -   布尔类型 (boolean)

 -   数字类型 (number)

 -   字符串类型 (string)

 -   数组类型 (array)

 -   元组类型 (tuple)

 -   枚举类型 (enum)

 -   对象类型 (object)

 -   任意类型 (any)

 -   null 和 undefined

 -   void 类型

 -   never 类型


#### 布尔类型 (boolean)   true | false

```typescript
const flag:boolean = true
```

####   数字类型 (number)

```typescript


// 二进制
const num2 = 0b10101

// 八进制
const num8: number = 0o74;

// 十六进制
const num10: number = 100

// 十六进制
const numf: number = 0xf0

console.log(num2, num8, num10, numf) // 21 60 100 240 
```

####   字符串类型 (string)

```typescript
var str:string = 'this. is TypeScript'
```

####   数组类型 (array)

```typescript
// 第一种定义方式
const arr:number[] = [1, 2, 12345, 5642]

const arr2:string[] = ["golang", "TypeScript", "puthon"]

// 第二种定义方式
const arr3:Array<number> = [12, 415, 4785]
const arr4:Array<string> = ["golang", "TypeScript", "puthon"]
const arr5:Array<object> = [{id: 1}, {age: 'go'}, {name: 'kun'}]
const arr6:Array<any[]> = [[1, 2, 5], ["golang", "TypeScript", "puthon"], [true, false, true]]

console.log(arr3, arr4, arr5, arr6)

```

####   元组类型 (tuple)

```typescript
const tup:[string, number, boolean] = ['golang', 2, true]

console.log(tup) // ['golang', 2, true]
```

####   枚举类型 (enum)

```typescript

// 枚举关键字 枚举名
enum enu{
    success="成功",
    error="失败"
}

var en:enu = enu.success

console.log(en) // 成功

enum Color {
    red, blue, pink, origin
}

console.log(Color.pink) // 2


enum Color1 {
    red, blue, pink=8, origin
}

console.log(Color1.pink, Color.origin) // pink, 9
```

####   对象类型 (object)

```typescript

var obj:object = {
    a: 2,
    b: 3
}

console.log(obj) // {a:2, b:3}

```

####   任意类型 (any)

```typescript

var any:any = 'str'

any = 123

console.log(any) // 123
```

 -   **any 类型 的用处**
```typescript
var oBox = document.querySelector("div#box")
oBox.style.color = "pink"
```

####   null 和 undefined   



```typescript
var unde:number | undefined;

unde=12345

console.log(unde)  // 12345

var nullUnde:number | null | undefined;

nullUnde=123

console.log(nullUnde)
```

####   void 类型  

 -   **没有任何类型**
    
     -  `应用场景`: **用于定义方法的时候没有返回值**

```typescript
function run():void {
    console.log('run')
}

function fn():string|number {
    return 'num'
}

const data:string|number =  fn()

console.log(data)

run()
```

####   never 类型

 -   `是其他类型   包括 (null 和 undefined) 的子类型  代表从不会出现的值`

 -   **声明 never的变量  只能被 never类型所赋值**
    ```typescript
        var nev: undefined;
        nev = undefined
        
        var neve: null;
        neve = null
        
        console.log(nev, neve)
    ```


```typescript

// neever 类型
var a:never;

a = (()=>{throw new Error('错误')})()
```


## TypeScript 函数

#### 函数定义

 -   ES5 函数定义方法

```typescript
// 函数声明式
function run() {
    return 'run'
}

// 匿名函数
var run2 = function () {
    return 'run2'
}
```

 -   TS 中函数定义方法
```typescript
// 函数声明式
function run(): string {

    return 'run'
}

// 匿名函数
var run2 = function (): number {
    
    return 123
}
alert(run2())

```


#### 定义方法传参

```typescript
// 函数传参
function getInfo(name: string, age: number): string {

    return `${name} ------ ${age}`
}

alert(getInfo('zhangsan', 20))


function getFn(fun:string):Function {
    return function(){
        console.log(fun)
    }
}


getFn(getInfo('张三', 20))()
```

#### 方法可选参数

 -   ES5 里面方法的实参和形参可以不一样

 -   TS 中必须一样    如果不一样  需要配置可选参数
```typescript
function getBa(name: string, age?:number): string {

    return `${name} ------ ${age}`
}

alert(getBa('zhangsan'))  // zhangsan------undefined
```

 -   ES6 | TS 可设置默认参数
```typescript
function getBab(name: string='zhangsan', age:number=20): string {

    return `${name} ------ ${age}`
}

alert(getBab())  //   zhangsan--------20
alert(getBab(20))  //   zhangsan--------20



function getBab(name: string='zhangsan', age:number=20): string {

    return `${name} ------ ${age}`
}

alert(getBab())  // 张三--------20
alert(getBab('lisi')) // lisi --------20


```

#### 剩余参数

```typescript
// 拓展运算符
function sum1 (...result:number[]):number {
    var sum = 0;
    for (let index = 0; index < result.length; index++) {
        sum += result[index];
    }
    return sum
}
alert(sum1(1, 2, 3, 4))


// 拓展运算符
function sum1 (a:number,...result:number[]):number {

    var sum = a;

    for (let index = 0; index < result.length; index++) {
        sum += result[index];

    }
    return sum
}
alert(sum1(1, 2, 3, 4, 5, 6))
```

#### TS 函数重载

 - java中方法的重载  两个或两个以上同名函数   参数不一样  会发生重载情况

 - TS 中的重载  未同一个函数提供多个函数定义来试下多种功能

```typescript

// TS 为了 兼容 ES5 和 ES6 重载


// ES5   下面的函数会重载上面同名的函数
function css(config) {

}
function css(config. value) {
    
}


function getFunc(name:string):string;

function getFunc(age:number):string;

function getFunc(str:any):any {
    if (typeof str === "string") {
        return '我叫'+ str
    } else {
        return  '我的年龄是' + str
    }
}

alert(getFunc('张三')) // 我叫张三
alert(getFunc(20))  // 我的年龄是20
alert(getFunc(true))  // 我的年龄是20

```


#### 箭头函数 ES6

 -    箭头函数本身没有 this   
 
 -    它里面的 this 指向 箭头函数 上下文的this

```typescript
setTimeout(() => {
    alert('run')
}, 2000);
```

##  类

### ES5 构造函数 和 继承

####   ES5 构造函数   类

```javascript

function Person():void {
    this.name="zhangsan",
    this.age=20

    this.run = function() {
        alert(this.name + '在运动')
    }
}

// 成员方法  需要通过 new 关键字 实例构造函数才能调用
// 原型链上面的属性会被多个实例共享    构造函数不会
Person.prototype.sex = "男"

Person.prototype.work = function() {

    alert(this.name + '在广州')
}

var p = new Person()

alert(p.name)

p.run()

p.work()



// 静态方法    可以有构造函数 自己调用
Person.getSta = function () {
    alert('我是静态方法')
}
Person.getSta()

```


####   原型链继承

```javascript

 function Person():void {
    this.name="zhangsan",
    this.age=20

    this.run = function() {
        alert(this.name + '在运动')
    }
}

// 成员方法  需要通过 new 关键字 实例构造函数才能调用
// 原型链上面的属性会被多个实例共享    构造函数不会
Person.prototype.sex = "男"

Person.prototype.work = function() {

    alert(this.name + '在广州')
}

var p = new Person()


// 静态方法    可以有构造函数 自己调用
Person.getSta = function () {
    alert('我是静态方法')
}
Person.getSta()



function NewWeb() {

}

NewWeb.prototype = new Person()  // 原型链继承

// 既可以继承 构造函数里面的 属性和方法  也可以继承原型链上面的属性和方法
var w1 = new NewWeb()

w1.work()

console.dir(w1, p)

```

 -  **this问题**

```javascript
function Person(name, age):void {
    this.name=name,
    this.age=age

    this.run = function() {
        alert(this.name + '在运动')
    }
}

function NewWeb() {

}

NewWeb.prototype = new Person('李四', 20)  // 原型链继承  实例化子类的时候无法给父类传参
NewWeb.prototype = new Person('王五', 20)  // 共享一个方法
NewWeb.prototype = new Person('赵六', 20)  

var w1 = new NewWeb()

w1.run()  // 李四在运动

```

####  组合继承  继承类   

**原型链 + 对象  组合继承模式**
**call 借用 构造函数 + 原型链 = 组合继承**
 ```javascript
 function Person():void {
    this.name="zhangsan",
    this.age=20

    this.run = function() {
        alert(this.name + '在运动')
    }
}

 function Web(name, age) {
    Person.call(this, name,age)  /** 继承构造函数里的属性和方法 */
}

var w = new Web()

w.run() // zhangsan 再运动

```

**第二种方式**
```javascript
 function Person():void {
    this.name="zhangsan",
    this.age=20

    this.run = function() {
        alert(this.name + '在运动')
    }
}

 function Web(name, age) {
    Person.call(this, name,age)  /** 继承构造函数里的属性和方法 */
}

Web.prototype = Preson.prototype

var w = new Web('赵四', 30)

w.run() // zhangsan 再运动
```

### TypeScript 类 和 继承

#### TS 类的定义

 -  `通过 class 关键字 定义类`

```typescript
class Person {
    name: string;  // 定义属性  省略 public  关键字

    constructor(name:string='zhangsan') {  // 构造函数     实例化类的时候触发的方法

        this.name = name
    }

    run():void {

        alert(this.name)
    }

    getName():string {
        
        return this.name
    }

    setName(name:string):void {
        
        this.name = name
    }

}


var p = new Person()

p.run()  // zhangsan

p.setName('赵四')

alert(p.getName()) // 赵四
```


#### TS 实现继承

 -  `通过 extends super 关键字实现`

```typescript
class Person {
    name: string;  // 定义属性  省略 public  关键字

    constructor(name: string = 'zhangsan') {  // 构造函数     实例化类的时候触发的方法

        this.name = name
    }

    run(): void {

        alert(`${this.name}--父类`)
    }

}


class Son extends Person {

    constructor(name: string) {

        super(name) /* 初始化父类的构造函数 */
    }

    run():void {
        alert( `${this.name}在运动---子类` )
    }

    work():void {
        alert(`${this.name}在运动`)
    }

}


var s = new Son('王五')

s.run()  // 王五在运动 --- 子类

s.work()  // 王五在运动
```

#### TS 类里面的修识符

 -   public

 -   protected

 -   provite


```typescript
/**
 *      类里面的修饰符 
 * 
 *      public    (公有)  在类里面  子类  类外面都可以访问
 *      protected   (保护类型)    在类里面  子类里面可以访问   在类外部没法去访问
 *      private    (私有)     在类里面可以访问   子类 类外部都无法访问
 * 
 * 
 *      属性如果不加修识符  默认是公有 (public)
 */

class Father {

    // 公有类型
    private name: string;

    constructor(name: string) {
        this.name = name
    }

    run(): string {

        return `${this.name}在嗨皮`
    }

    work() {
        alert(`${this.name}在工作`)
    }
}


class Child extends Father {

    constructor(props:string="CHILDREN") {
        super(props)
    }

    work():void {
        console.log(`${this.name}`) // private 报错
    }
}

var fa = new Father('李四')

var p = new Father('哈哈哈')

var chi = new Child('Children')

fa.work()

alert(p.name) // protected   private 报错

```

#### ES5 静态属性  静态方法

```javascript
// 静态属性 和 静态方法

function Stati () {
    this.run3=function() { // 实例方法

    }
}

Stati.run4 = function() { /* 静态方法 */

}

Stati.name="哈哈哈"

var  stat = new Stati()

Stati.run3()  /*  静态方法的调用 */
```

#### TS 静态属性和静态方法
```typescript
class Stati {

    public name:string;

    public num:number = 20;

    // 静态属性
    static sex:string = '男'

    constructor(name:string) {
        this.name=name
    }

    run():void {
        
        alert(`${this.name}嘻嘻嘻`)
    }

    work():void {
        alert(`${this.name}呼呼呼 ${this.num}`)
    }

    static print ():void {  
        /* 静态方法   可以调用类里面的 静态 属性 */
        alert('这是静态方法'+ Stati.sex)
        alert('这是静态方法'+ this.sex)
    }
}

var newP = new Stati('张三')

newP.run()
Stati.print()
```

#### 多态

 -  `多态`: **父类定义一个方法不去是实现  让继承他的子类去实现  每个子类有不同的表现**

 -  `多态是一种继承的表现`
```typescript
class Animal {

    name:string

    constructor(name:string) {

        this.name = name
    }

    eat():void {   // 父类的 方法 提供逻辑

        console.log('吃的方法')
    }
}

class Dog extends Animal {

    constructor(name:string) {
        super(name)
    }

    eat():string {   // 子类实现父类方法提供的逻辑
        return this.name + '吃肉'
    }
}

class Cat extends Animal {

    constructor(name:string) {
        super(name)
    }

    eat():string {
        return this.name + '吃猫粮'
    }
}
```

#### TS 中的 抽象类  (抽象类实现多态)

 - **提供其他类继承的基类  不能直接被实例化**

 - **用 abstract 关键字定义抽象类和抽象方法**
 
 - **抽象类中的抽象方法不包含具体实现并且必须在派生类中实现**

 - **abstract 抽象方法只能放在抽象类里面** 

 - **抽象类和抽象方法用来定义标准**

```typescript
abstract class Anima {  // abstract 关键字定义抽象类和抽象方法

    public name:string

    constructor(name:string) {

        this.name = name
    }

    // 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
    abstract eat():any   // abstract 关键字定义抽象类和抽象方法

}

// var a = new Anima()  // 不能被实例化

class Dogs extends Anima {

    constructor(name:string) {
        
        super(name)
    }

    
    //  抽象类的子类  必须实现抽象类的方法
    //  抽象类和抽象方法用来定义标准

    eat() {
        console.log(this.name+'吃又又')

    }

    run():void {
        console.log('其他方法可以不实现')
    }
}

var d = new Dogs('小可爱')

d.eat() // 小可爱吃又又
```


##  TypeScript   接口

 -  接口作用: 

     1.  在面向对象的编程中  接口设一种规范的定义  

            定义了 行为 和 动作规范

     2.  在程序设计里面  接口起到一种 限制 和 规范作用

     3.  定义了 某一批类 所需要遵守的规范  规定了类里面必须提供某些方法

     4.  提供了更加灵活的接口类型  包括 属性 函数 可索引 和 类


#### 1. 属性接口  

 -  `传入参数 进行约束`
```typescript
function printLabel(label:string):void {
    console.log(label)
}
printLabel(123+'')
```


 - `TS 自定义方法传入参数 对 对象 进行约束`
```typescript
function printLabe(labelInfo:{label:string}):void {
    console.log(labelInfo)
}

const labelObj = {
    label: '杜方块',
    age: 28
}

printLabe(labelObj)
// printLabe({name: '杜方块'}) // 错误写法
```

 
 -  `对批量方法传入参数进行约束`
```typescript
 // 传入对象的约束
interface FullName {

    firstName:string;

    secondName: string;
}

function printName(name:FullName) {
    

    console.log(name.firstName + name.secondName)
    console.log(name.firstName + name.secondName + name.age) // 报错  FullName 上下文不包含 age

}

var newObj = {
    firstName: '杜',
    secondName: '方兵',
    age:20
}

// 传入的对象参数必须包含 firstName 和 secondName 两个属性   且数据类型为字符串
printName(newObj)
```


#### 2. 可选属性接口

 -  `Typescript 封装 ajax`

```typescript
function ajax(config:Config) {

    var xhr = new XMLHttpRequest()

    xhr.open(config.type, config.url, true)

    xhr.send(config.data)

    xhr.onreadystatechange=function() {

        if(xhr.readyState === 4 && xhr.status ===200) {

            console.log('请求成功')

            if (config.dataType == 'json') {

                JSON.parse(xhr.responseText)
            } else {
                console.log(xhr.responseText)
            }

        }
    }
}

const objAjax = {
    data: 'name=zhangsan',
    type: 'get',
    url: 'https://www.baidu.com/api/productlist',
    dataType: 'json'
}

ajax(objAjax)
```


#### 加密函数接口

```typescript
interface encrypt {

    (key:string, value:string):string;

}

var md5:encrypt = function(key:string, value:string):string {

    // 模拟操作
    return key+value
}

alert(md5('name', 'zhangsan'))
```

#### 可索引接口  数组, 对象的约束 (不常用)

```typescript
var arr134:number[] = [2345, 3456, 4567]

var arr136:Array<string> = ['1201', '2301']


interface UserArr {
    [index:number]:string
}

var arr147:UserArr = ['123', '456']


console.log(arr147[0]) // '123'

interface UserObj {

    [index:string]:string
}

var obj157:UserObj = {
    name: 'zhangsan'
}

console.log(obj157)
```


#### 类  类型接口

```typescript
// 类类型接口

interface InterClass {
    name:string;

    eat(str:string):void;
}

class Don implements InterClass {

    name:string;

    constructor(name:string) {
        this.name = name
    }

    eat():void {
        console.log(this.name)
    }

}

class Cat implements InterClass {

    name:string;

    constructor(name:string) {
        this.name = name
    }

    eat(foot:string):void {

        console.log(this.name + foot)
    }

}

var d = new Don('小黑')

var ca = new Cat('小黄')

d.eat()

d.eat('屎')
```


#### 接口扩展  (接口继承接口)

```typescript
interface Peopl {
    eat(str:string): void
}

interface Peop extends Peopl {

    work(str:string): void;
}

class Programmer {
    public name:string
    
    constructor(name:string) {
        this.name = name
    }

    coding (code:string) {
        console.log(this.name + code)
    }
}

class People extends Programmer implements Peop {

    constructor(name: string) {
        super(name)
    }

    eat() {
        console.log(this.name + '饭')
    }

    work() {
        console.log(this.name + '敲代码')
    }
}

var pl = new People('老王')


pl.eat()
pl.coding('ts代码')
```


##  泛型  

 -  避免重复代码  对不特定数据类型的支持 (类型校验)

#### 泛型定义  泛型函数

 -   `T 表示泛型   类型由调用这个方法的时候决定`

```typescript
// 只能返回 string 类型的数据

function getData (value:string):string {
    return value
}

// 返回 string 类型 和 number 类型
function getData1 (value:number):number {

    return value
}

// 使用any类型  放弃了类型检查
function getData1 (value:any):any {

    return value
}

```

 -    `泛型`
```typescript
// T 表示泛型   类型由调用这个方法的时候决定
function getData2<T>(value:T):T {
    return value
}

getData2<number>(123)
```


#### 泛型类

```typescript
class MinClass<T> {

    public list:number[] = []

    add(num:number) {
        this.list.push(num)
    }

    min():number {
        var minNum = this.list[0]

        for (let i = 0; i < this.list.length; i++) {
            
            if (minNum > this.list[i]) {

                minNum = this.list[i]
            }
            
        }

        return minNum
    }
}

var m = new MinClass()

m.add(2)
m.add(23)
m.add(3)
m.add(-5)

alert(m.min())
```


 -   **泛型类接口**
```typescript
class User {
    username: string | undefined;
    password: string | undefined;
    status: number | undefined;
}

// 操作数据库的泛型类
class MysqlDB<T> {

    add(user: T): boolean {

        console.log(user)

        return true
    }
}


var u = new User();

u.username = '张三'

u.password = '123456'

// u.status = 200

var DB = new MysqlDB<User>()

DB.add(u)

// 定义文章分类 类  和数据库表做 映射

class ArticleCate {
    title: string | undefined;
    desc: string | undefined;
    status: number | undefined;

    constructor(params: {
        title: string | undefined;
        desc?: string | undefined;
        status: number | undefined;
    }) {
        this.title = params.title;
        this.desc = params.desc;
        this.status = params.status
    }
}

var art = new ArticleCate({
    title: '剑来',
    status: 200
})

var article = new MysqlDB<ArticleCate>()

article.add(art)
```

#### 泛型接口

 -   `函数类型接口`

```typescript
interface ConfigFn {
    (value1:string, value2:string):string
}

var setData:ConfigFn = function(value1:string, value2:string):string {
    return `${value1}======= ${value2}`
}

alert(setData('name', 'zhangsan'))
```


 -   `泛型接口`

```typescript
interface ConfigFn {
    <T>(value1:T):T;
}

var setData:ConfigFn = function<T>(value1:T):T {

    return value1
}

alert(setData<string>('name'))


// 第二种

interface ConfigFn1 {

    <T>(value1:T):T;
}

function getState<T>(value1:T):T {

    return value1
}

var g:ConfigFn1 = getState

alert(g<string>('name'))
```


#### 总结

```typescript
/**
 *      功能:    定义一个操作数据库的类   支持 Mysql Mssql MongoDb
 * 
 *      要求1:   Mysql Mssql MongoDb 功能一眼  都有 add update delete get 方法
 * 
 *      注意:  约束统一的规范  以及代码重用
 * 
 *      解决方案:   需要约束规范所以要定义接口    需要代码重用   所以用到泛型
 *          
 *           1. 接口: 在面向对象的编程中, 接口是一种规范的定义  定义了行为和动作的规范
 * 
 *           2. 泛型: 解决 类  接口  方法的复用性
 */

interface DB1<T> {

    add(info: T): boolean;

    update(info: T, id: number): boolean;

    delete(id: number): boolean;

    get(id: number): any[]
}


// 定义一个操作 mysql 数据库的类

// TODO: 注意: 要实现泛型接口   这个类也要是一个泛型类

class MysqlDb<T> implements DB1<T> {
    add(info: any): boolean {

        console.log(info)

        return true
        throw new Error("Method not implemented.")
    }
    update(info: any, id: number): boolean {
        throw new Error("Method not implemented.")
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.")
    }

}

// 定义一个操作 mssql 数据库的类
class MssqlDb<T> implements DB1<T> {

    constructor() {
        
        console.log('数据库建立链接')
    
    }

    add(info: any): boolean {
        console.log(info)

        return true
        throw new Error("Method not implemented.")
    }
    update(info: any, id: number): boolean {
        throw new Error("Method not implemented.")
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.")
    }
}


//  操作用户表   定义一个 User 类 和 数据表做映射


class User {
    username: string | undefined;

    password: string | undefined;
}

var use = new User();

use.username = '张三'

use.password = '123456'


var oMysql = new MysqlDb<User>();

oMysql.add(use)

var oMssql = new MssqlDb<User>()

oMssql.add(use)

var oMysqlData = oMssql.get(4)


console.log(oMysqlData)
```


## 模块

 -   `内部模块` ===> `命名空间`

 -   `外部模块` ===> `模块`

 - 模块在其自身的作用域里执行，而不是在全局作用域里；

         1. 这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，
         
         2. 除非你明确地使用export形式之一导出它们。 
         
         3. 相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它们，可以使用 import形式之一。


 -  模块是自声明的；两个模块之间的关系是通过在文件级别上使用imports和exports建立的。

 - 模块使用模块加载器去导入其它的模块。 在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。
 
     1. 大家最熟知的JavaScript模块加载器是服务于Node.js的 CommonJS和服务于Web应用的Require.js。


###

 -    公共的功能单独抽离成一个文件作为一个模块

 -    模块内的 变量 函数 类 等默认是私有的   

 -    通过 exports 暴露模块里面的数据  (变量 函数 类)

 -    通过 import 引入已暴露的模块  访问模块 export 模块数据



#### 模块
 -  **ts/module/module.ts**
```typescript
// import { MysqlDb1 } from '../module/db'
 
class UserClass {
    username: string | undefined;

    password: string | undefined;
}


var UserModel = new MysqlDb1<UserClass>();


export {
    UserClass,
    UserModel
}

```

 -  **ts/module/db.ts**
```typescript
interface DB1<T> {

    add(info: T): boolean;

    update(info: T, id: number): boolean;

    delete(id: number): boolean;

    get(id: number): any[]
}


// 定义一个操作 mysql 数据库的类

// TODO: 注意: 要实现泛型接口   这个类也要是一个泛型类

class MysqlDb1<T> implements DB1<T> {
    add(info: any): boolean {

        console.log(info)

        return true
    }
    update(info: any, id: number): boolean {
        return true
    }
    delete(id: number): boolean {
        return true
    }
    get(id: number): any[] {
        return [
            { title: '123123' }, { title: '123025' }
        ]
    }

}

// 定义一个操作 mssql 数据库的类
class MssqlDb1<T> implements DB1<T> {

    constructor() {

        console.log('数据库建立链接')

    }

    add(info: any): boolean {
        console.log(info)

        return true
    }
    update(info: any, id: number): boolean {
        console.log( [
            { title: '123123' }, { title: '123025' }
        ])

        return true
    }
    delete(id: number): boolean {
        console.log( [
            { title: '123123' }, { title: '123025' }
        ])

        return true
    }
    get(id: number): any[] {
        return [
            { title: '123123' }, { title: '123025' }
        ]
    }
}


//  操作用户表   定义一个 User 类 和 数据表做映射

export {
    MssqlDb1,
    MysqlDb1
}
```

 -  **ts/index.ts**
```typescript
// import {UserClass, UserModel} from './model/model'

var us = new UserClass();

us.username="张三"

us.password = '123456123456'


UserModel.add(us)


// 获取 user 表数据

var res = UserModel.get(123)

console.log(res)
```



####  命名空间

 -  作用: 重复代码复用   避免命名重复

 -  一个模块可以有多个命名空间

```typescript
namespace A {
    // 定义一个操作 mssql 数据库的类
    export class Anima {

        public name:string
    
        constructor(name:string) {
    
            this.name = name
        }

        eat():void {
            console.log(this.name + '隔壁')
        }
    
    }
}

var d = new A.Anima('隔壁')

d.eat()
```


## 装饰器

 -   装饰器是一个方法 :  可以注入到类 方法 属性参数上扩展类 属性 方法 参数的功能

 -   **常见装饰器** : `类装饰器`, `属性装饰器`, `方法装饰器`, `参数装饰器`

 -   **装饰器写法** : `普通装饰器(无法传参)`,  `装饰器工厂(可以传参)`



#### 类装饰器 (普通装饰器)

 -   在类生命前被声明 (紧靠着类声明)

 -   类装饰器应用于 类构造函数  可以用来讲师 修改 替换类定义   传入一个参数

```typescript
// 类装饰器


function logClass (params:any):void {
    console.log(params)

    // params 就是当前类
    params.prototype.apiUrl = 'xxx'

    params.prototype.run = function() {
        console.log('我是一个 run 方法')
    }
}


@logClass
class HttpClient {
    constructor() {

    }

    getData():void {

    }
}

var http:any = new HttpClient()


console.log(http.apiUrl)


http.run()

```


#### 装饰器工厂

```typescript

function loggClass(params:string):any {

    return function(target:any) {

        console.log(target) // 

        console.log(params) // hello world

        target.prototype.apiURL = params
    }

}

@loggClass('hello World')
class HttpClient {
    constructor() {

    }

    getData():void {

    }
}

var http:any = new HttpClient()

console.log(http.apiURL) // hello world
```

#### 类装饰器重载构造函数
```typescript
// 类装饰器重载构造函数

function logCl (target:any) {
    console.log(target)

    return class extends target {
        apiUrl:any='我是修改后的数据'


        getData(){
            console.log(this.apiUrl + '------') // Decorator.js:62 我是修改后的数据
        }
    }
}

@logCl
class HttpCli {

    public apiUrl:string|undefined;
    constructor() {
        this.apiUrl = '构造函数里面的apiurl'
    }

    getData():void {
        console.log(this.apiUrl)
    }
}

var http1 = new HttpCli()


http1.getData()

```


#### 属性装饰器

```typescript
// 属性装饰器
function logCl (target:any) {
    console.log(target)


}

function logProperty (params:any) {

    return function(target:any, attr:any) {
        console.log(target)
        console.log(attr)
        console.log(params)
        target[attr] = params
    }
    
}

@logCl('xxxx')
class HttpCli {

    @logProperty('http://baidu.com')
    public url:string|undefined;
    constructor() {
        this.apiUrl = '构造函数里面的apiurl'
    }

    getData():void {
        console.log(this.url + '123') // http://baidu.com123
    }
}

var http1 = new HttpCli()


http1.getData()
```


#### 方法装饰器

```typescript
```