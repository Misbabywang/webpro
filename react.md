#  React

#### React 底层实现原理

setState + 生命周期 + 虚拟DOM



### React  基础

```javascript
// 导入 react
import React from 'react'  // React 核心库
import ReactDOM from 'react-dom' // Web 应用

// 创建 react 元素
const title = React.createElement('h1', null, 'Hello React')

// 渲染 react 元素

// React Web 应用渲染页面专用库
ReactDOM.render(title, document.querySelector('div#root'))
```

####  jsx

- createElement() 存在问题
  - 繁琐不简洁
  - 不直观  无法一样看出所描述的结构
- jsx 注意点
  - React 元素的属性名   使用 驼峰命名法
  - 类名 关键字  class --> className
  - 没有子节点的React 元素  可以使用  />  结束
  - 小括号包裹 jsx
- 嵌入 js 表达式
  - 语法 { javascript 表达式 }
  - {}  可以使用任何 javascript  表达式
  - js 中的对象  不能放在 {}  中
  - 语句不能放在 {}  中



####  为什么在 componentDidMount 发送请求

-  官方推荐
-  constructor 发送两次请求     报错 `无法在尚未安装的组件上调用setState`
-  componentWillMount  未发送请求   不会执行 setState



####  组件

- 特点:  可复用  独立  可结合
- 组件表示页面中的功能
- 组合多个组件实现完整的页面功能

-  容器组件   class 类组件
-  UI 组件    函数组件

**函数创建组件**

- 约定1  函数名称必须 大写字母开头
- 约定2  必须有返回值
- 用 函数名 渲染组件
- 函数组件

```javascript
const Com = () => {
    return (
        <Fragment>
            <h2>Hello</h2>
            <Test1 />
        </Fragment>
    )
}

const Test1 = () => <div>套娃</div>
```

**类组件**

```javascript
class Test2 extends React.Component {
    rnder() {
        return <div>Hello Class Component</div>
    }
}
```

**有状态组件和无状态组件**

- 无状态组件 -->  函数组件
- 有状态组件 -->  类组件
- 状态 (staet) 数组  组件内部私有数据
- 函数组件   只负责数据展示 (静态)    类组件 负责更新 UI (动态)

**受控组件 和 非受控组件**

- 受控组件 (受到React控制的组件 执行 this.setState方法 )
- 非受控组件 (DOM 操作的组件)



#### 组件通讯

- 组件是封闭的  接收外部数据通过 props 实现
- props 作用: 接收传递给组件的数据
- 传递数据: 给组件标签添加属性
- 接收数据: 函数组件通过 参数 props接收数据   类组件通过 this.props 接收数据

####  组件传值

-  父组件通过自定义属性的方式向子组件传递值   子组件通过 props 进行接收父组件传递的数据
-  子组件通过调用父组件的方法   并把子组件的值以形参的方式进行传递
-  跨组件传递数据  Context
-  兄弟组件传值  可以使用 Context  或者 定义另外一个组件  作为公共父组件 (状态提升)
-  父组件 render 调用时   子组件的render方法同时被调用
-  react 默认不对数据源做转换  (标签渲染 ==>  字符串)



####  虚拟DOM

`初始阶段`

-  收集 state props
-  定义 jsx
-  state + jsx 生成虚拟DOM
-  render 用生成的 虚拟DOM 转换为 真实的 DOM 渲染页面

`更新阶段`

- 收集新的  state    props
- 定义 jsx
- state + jsx 生成新的 虚拟DOM
- 用原来的 虚拟DOM  和 现在新的虚拟 DOM 做 diff(比较)
- shouldComponentUpdate 判断是否挂载
- render  将比较结果不同的节点   转换为 真实的 DOM渲染页面

**优点 :**

-  性能提高
-  虚拟DOM 在可以运行 js代码 的地方都可以转换为 真实DOM



#### diff 算法

-  调和    将 Virtual DOM 树  转换成 actual DOM树的最少操作过程



#### diff 算法策略

**策略一 :** `tree diff`

- React 通过 updateDepth  对 虚拟DOM 树  进行层级控制
- 对树分层比较  两棵树  只对同一层次节点进行比较
- 只需遍历一次  就能完成整棵DOM树比较

**策略二 :**  `component diff`

- 相同类的两个组件  生成相似的树形解构      用于不同类的组件  生成不同的树形结构
  -  同一类型的两个组件 按 层级比较 继续比较 虚拟DOM树 即可
  -  不同类型的组件  将一个 (将被改变的)  组件判断为 dirty component  (脏组件)    从而替换整个组件的所有节点

**策略三 :**  `element diff`

-  对同一层级的一组子节点   通过唯一 id 区分



#### 生命周期 钩子函数

- Initialization  初始化  装载 props & state ( constructor )
- Mounting   挂载期 
  1. componentWillMount ( DOM 节点准备要挂载 ) 只执行一次  
     - 16.4+ 替换为 UNSAFE_componentWillMount

```
     2.    render ( 准备渲染页面 ) 执行完   DOM redirec 内部实现

     3.    componentDidMount  ( DOM 渲染完成 )
```

- Updation (props states)
      

  - props :

  ```
    1.  componentWillReceiveProps   (组件接受数据)
    
        React 16.4+ 替换为 UNSAFE_componentWillReceiveProps
        
        新增钩子 getDerivedStateFromProps()  用于替换 state 数据
    
    2.  ShouldComponentUpdate 
          
          ( 返回 true or false ) true 继续执行 false 终止执行
    
    3.  componentWillUpdate
    
          - 16.4+ 删除
    
          ( DOM 节点准备要挂载 )
    
    4.  render
    
          ( 准备渲染页面 ) 执行完   DOM redirec 内部实现
          
              4.5 新增 getSnapshotBeforeUpdate
          
    5.  componentDidUpdate
     
               ( DOM 渲染完成 )
  ```

  - state :

  ```javascript
         1. ShouldComponentUpdate
     
               ( 返回 true or false ) true 继续执行 false 终止执行
         
         2. componentWillUpdate
     
               - 16.4+ 替换为 UNSAFE_componentWillUpdate
     
               ( DOM 节点准备要挂载 )
         
         3. render
     
               ( 准备渲染页面 ) 执行完   DOM redirec 内部实现
          
         4. componentDidUpdate
     
               ( DOM 渲染完成 )   进行 ajax 操作
  ```

  

-  Unmounting  卸载        

1. componentWillUnmount

###### 在 componentWillUpdate  componentDidUpdate 进行 this.setState 等数据操作  容易形成死递归

######  componentWillUpdate 准备渲染页面钩子 和 新增 getDerivedStateFromProps 获取组件传递数据 钩子 互斥 尽量不同时使用



#### 渲染

- 条件渲染

```javascript
const isVip = true

const vipContent = () => isVip ? <div>点此领取礼包</div> : <div>会员注册停止</div>
```

- 循环渲染

```javascript
 const list = [
    {id: 1, name: '情深缘浅', children: [1, 2, 3]},
    {id: 2, name: '断点', children: [4, 5, 6]},
    {id: 3, name: '夏天的风', children: [7, 8, 9]}
]


<ul>
    {
        list.map( item => <div key={item.id}>{item.name} :
        {
            item.children.map( value => <li key="index">{value}</li> )
        }
        </div> )
    }
</ul>
```



#### 事件绑定

- React 事件绑定语法 与 DOM事件语法相似
- on + 事件名称 = {事件处理程序}
- React  事件采用驼峰命名法
- 函数组件事件绑定

```javascript
function App() {
    function handleClick() {
        console.log(111)
    }
    return <button onClick={handleClick}>点鸡</button>
}
```

- 类组件事件绑定

```javascript
export default class Hello extends Component {
    render () {
        return (
            <button onClick={this.handleClick}>点鸡</button>
        )
    }
    handleClick() {
        console.log(111)
    }
}
```

-  可以通过  事件处理程序的参数  获取事件对象 (合成事件对象)

- 合成事件:  兼容所有浏览器

-  关于事件绑定 this 指向问题

  - 结构数据   const { count } = this.state

  - 使用箭头函数  ()=>this.setState(count: this.statecount+2)

  - 使用 bind 改变 this指向

    - 形成了  原型对象上的方法进行拷贝   改掉 this 指向  拷贝成构造函数属性
    - this.changeCount = this.changeCount.bind(this)

  - 直接事件绑定  箭头函数 

    ```javascript
    <h2 onClick={() => this.setState({ount: this.state.count +1})}>{this.state.count}</h2>
    ```



#### ref

```javascript
<input type="text" ref="text1" />
<input type="text" ref={el => this.text2 = el} />
<input type="text" ref={this.textRef} />
<button onClick={()=>console.log(this.refs.text1.value)}>Ref第一代</button>
<button onClick={()=>console.log(this.text2)}>Ref第二代</button>
<button onClick={()=>console.log(this.textRef.current.value)}>Ref第三代</button>
```



#### setState

-  节省性能会异步更新
- 推荐语法  &  第二参数

```javascript
this.setState((state, props) => {
    return {
        count: state.count+1
    }
}, ()=>{
    console.log(state.count)
})
```



#### PureComponent

```javascript
class SonBox extends PureComponent {

    render() {
        return (
            <h1>随机数: {this.props.count}</h1>
        )
    }
}
```

#### render Props

``` javascript
class Mouse extends Component {

    state = {
        title: 'Hello World'
    }

    render() {
        const { title } = this.state
        const { render, children = render } = this.props
        console.log(this.state)
        return children({ title })
        // this.props.render({ x, y })
    }
}
const App = () => (
	<div>
    	<Mouse render={({title})=>(<h1>{title}</h1>)} />
    	<Mouse>{({title="Hello World"}) => (<h1>{title}</h1>)}</Mouse>
    </div>
)
```



#### HOC  高阶组件

本身是一个函数  接收一个组件作为参数      一般以 with开头  返回一个组件(组件内部只提供逻辑和数据)  

```javascript
const withMouse = WrappedCompoennt => class extends Component {
    // 鼠标状态
    state = {
       title: '初始标题'
    }
    render() {
        const { state, props } = this
        return <WrappedCompoennt {...state} {...props} />
    }
}

// 测试高阶组件
const Position = ({date}) => <h1 {...date}> {title}{date} </h1>

const EnhancedPosition = withMouse(Position)

// 获取增强后的组件

export default class App extends Component {

    render() {

        return (
            <div>
                <EnhancedPosition date={new Date().getTime()} />
            </div>
        )
    }
}
```



#### Context

##### Context文件

```javascript
import React, { Component } from 'react'
export const { Provider, Consumer } = React.createContext();
```

##### 爷组件

```javascript
export default class Father extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'Hello World'
        }
    }
    render() {
        const { num } = this.state
        return (
            <div>
                <Provider value={this.state.text}>
                    <Son
                        name="rose"
                    />
                </Provider>
            </div>)}
```

##### 父组件

```javascript
export default class Son extends Component {
    // 推荐使用 props 作为 constructor 的参数
    render() {
        console.log(this.props)
        return (
            <div>
                <Test01
                // list={['red', 'green', 'skyblue']}
                >
                    {{ a: 'hello 子结点' }}</Test01>
                <h1>{this.props.name}</h1>
            </div>) }}
```

##### 孙组件

```javascript
import React, { Component } from 'react'
import { Consumer } from './conText'

export default class Test01 extends Component {
    render() {
        return (
            <div>
                <Consumer>
                    {value => <h1>{value}</h1>}
                </Consumer>
            </div> ) }}
```



### React-Router

**安装**

- yarn add react-router-dom

#### 编程式导航

```javascript
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
const Home = (props) => {
    console.log(props)
    return (<div>我是
   <button onClick={() => props.history.push('/login')}>首页</button>
    </div>)
}
export default class RouterInit extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to="/home">首页</Link>
                    <br />
           			<Route path="/" exact component={() => <h1>INDEX</h1>} />
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        )
    }
}
const Login = props => (<div><h1>登录</h1><h1 onClick={()=>props.history.goBack()}>返回</h1></div>)
```

#### 匹配模式

- 模糊匹配
  - 匹配规则: 只要 pathname 以 path 开头   就会匹配成功

```javascript
<Link to="/home">首页</Link>
<Route path="/home" component={Home} />
```

-  精确匹配
  - 匹配规则: 只有 path 和 pathname 完全匹配时才展示路由
  - 添加 exact 属性

```javascript
<Link to="/home">首页</Link>
<Route path="/home" exact component={Home} />
```

#### 路由鉴权

**鉴定权限组件**

```javascript
export const TOKEN_KEY = 'RPKJ_TOKEN'

export class Auth {
    static set token(value) {
        localStorage[TOKEN_KEY] = value;
    }

    static get token() {
        return localStorage[TOKEN_KEY];
    }

    static get isLogin() {
        return !!Auth.token;
    }

    static clear() {
        localStorage.removeItem(TOKEN_KEY)
    }
}
export const AuthRoute = ({ path, component: _com, signUrl = '/login' }) =>
    <Route path={path} render={props => Auth.isLogin ?
        <_com {...props} /> :
        <Redirect to={{
            pathname: signUrl,
            fromUrl: props.location.pathname
        }} />}
    />
```

**普通组件**

```javascript
<button onClick={() => {
   this.props.history.replace(this.props.history.location.fromUrl)
}}>登录</button>
```



####   fetch 封装

```javascript
export const BASE_URL = process.env.REACT_APP_URL;

const queryString = params => '?' + Object.keys(params).map(i => `${ i }=${ encodeURIComponent(params[i]) }`).join('&');

const form = new FormData()
form.append('file', new File())


// 如果是文件上传的 multipart/form-data 的 Content-Type，就不用再额外给 fetch 添加头设定。
const request = async (partialUrl, body, queryParams = {}, method = 'GET', contentType = 'application/json') =>
    (await fetch(BASE_URL + partialUrl + queryString(queryParams), {
        method, body: body ? contentType !== 'multipart/form-data' ? JSON.stringify(body) : body : null, headers: {
            ...['POST', 'PUT', 'PATCH'].includes(method) && contentType !== 'multipart/form-data' ? { 'Content-Type': contentType } : {}
        }
    })).json();

export const API = {
    get: (url, queryParams) => request(url, undefined, queryParams),
    delete: (url, queryParams) => request(url, 'DELETE', queryParams),
    post: (url, body, queryParams, contentType) => request(url, body, queryParams, 'POST', contentType),
    put: (url, body, queryParams, contentType) => request(url, body, queryParams, 'PUT', contentType),
    patch: (url, body, queryParams, contentType) => request(url, body, queryParams, 'PATCH', contentType),
    postFile: (url, body, queryParams) => request(url, body, queryParams, 'POST', 'multipart/form-data'),
}
```

**.env.development**  `开发后台接口地址`

```javascript
REACT_APP_URL=http://localhost:8080
```

**.env.production**   `生产后台接口地址`

```javascript
REACT_APP_URL=http://fbgj.com
```



### React-Hook

- Hook 是一个特殊的函数
- 应用场景: 编写函数组件并意识到需要向其添加一些 state  可以在现有的函数组件中使用 Hook
- 减少代码层级关系
- 没有生命周期   每个 effect的值单一
- 代码复用性更高   更简洁

#### useState

- 函数组件中，没有 this  
     不能分配或读取 this.state  
     直接在组件中调用 useState Hook：

```javascript
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量  初始化值为0 
  const [count, setCount] = useState(0);
}
```

- 调用 useState 方法的时候做了什么

  1. 定义了一个 state 变量  这里为 count    是一种在函数调用时保存变量的方式 —— useState
  2. 与 class 里面的 this.state 提供的功能完全相同
  3. 函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

- useState 需要哪些参数

  1. 唯一的参数是 初始 state

        可以按照需要使用数字或字符串对其进行赋值，而不一定是对象

        想要在 state 中存储两个不同的变量，只需调用 useState() 两次即可。

- useState 方法的 返回值
      

  1. 返回值: 当前 state 以及 更新 state 的函数   使用数组结构 解构返回值

        与 class 里面 this.state.count 和 this.setState 类似

- 读取 State

  1. class :    this.state.count
  2. function :   count

- 更新 State

  1. class :   ()=> this.setState({count: this.state.count +1 })
  2. function :   ()=> setCount(count+1)

- 总结 步骤

  1. 引入 React 中的 useState Hook。它让我们在函数组件中存储内部 state
  2. 创建一个函数  调用 useState,  传递 初始化参数,   接收 返回值 count (值) 和 setCount (更改值的函数)
  3. 更改 count 数据 ()=>setCount(count +1)  会更新 count 值 React 会重新渲染 这个函数  并把最新的 count 传给他

#### effect

###### React 组件中 两种常见的 effect 操作

##### 无需清除 effect

- 应用场景:  只想在 react 更新 DOM 之后 运行一些额外代码

  ```
    发送网络请求   手动变更 DOM    记录日志
  ```

- 示例: 手动更新 DOM
  **Class**

```javascript
class Example extends Component {

    construvtor(props) {
        super(props)
        this.state={
            count: 0
        }
    }

    componentDidMount() {
        document.title = `${count} times`;
    }

    componentDidUpdate() {
        document.title = `${count} times`;
    }

    render() {
        return (
            <button onClick={()=>this.setState({count: this.state.count +1})}><button>
        )
    }
}
```

**需要在两个生命周期函数中编写重复的代码。**

**Hook**

```javascript
function Example() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('my text');

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <button onClick={()=>setCount(count+1)}></button>
  );
}
```

- useEffect 做了什么?

  1. 知道  React 组件需要在渲染后执行某些操作 

     React 会保存传递的函数 (effect)  

     并且在执行 DOM 更新后 调用它

- 为什么在组件内部调用  useEffect ?

  1. 可以在 effect 访问 state 变量(其他props)  以及保存在函数作用域中
  2. Hook 使用了 JavaScript 的闭包机制

- useEffect 会在每次渲染后都执行吗 ?
      

  1. 默认情况下  第一渲染后 和 每次更新之后 都会执行  
  2. 每次运行 effect 的同时  DOM 都已经更新完毕

- 使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕  应用看起来响应更快  effect 不需要同步执行

- 为什么每次更新的时候都要运行 effect

```
 1.  当组件已经显示在屏幕上时，friend prop 发生变化时会发生什么？ 
        
        我们的组件将继续展示原来的好友状态。这是一个 bug。

 2.  还会因为取消订阅时使用错误的好友 ID 导致内存泄露或崩溃的问题。
```

##### 需要清除的 effect

- 应用场景: 订阅外部数据源
- 示例
  **Hook**
- 返回一个 cleanup 函数进行清除操作

```javascript
useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `${todos.text}`;
    // console.log(age, fruit)
    // setAge(age)
    return () => {
        console.log(111)
    }
})
```

- 为什么要在 effect 中返回一个函数 
      
  1. effect 可选的清除机制  每个 effect 都可以返回一个 清除函数

###### 并不是必须为 effect 中返回的函数命名。

#### Hook 规则

- Hook 本质是 js 函数  遵循两条规则   使用 eslint-plugin-react-hooks 进行约束

```
 1.  只在最顶层使用 Hook

 2.  直再 React 函数中调用 Hook
```

- 只在最顶层使用 Hook
  1. 不用在循环  条件 或者嵌套函数中调用 Hook
  2. 确保 Hook 在每一次渲染中都按照同样的顺序被调用
  3. React 能够多次的 useState 和 useEffect 调用之间确保 Hook 状态正确

 

```
**错误示范**
​```javascript
 // 🔴 在条件语句中使用 Hook 违反第一条规则
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }

// 结果
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
// useEffect(persistForm)  // 🔴 此 Hook 被忽略！
useState('Poppins')        // 🔴 2 （之前为 3）。读取变量名为 surname 的 state 失败
useEffect(updateTitle)     // 🔴 3 （之前为 4）。替换更新标题的 effect 失败
​```
```

- 只在 React 函数中 调用 Hook
  1. 只在 React 函数组件中调用 Hook
  2. 只在自定义的 Hook 中 调用其他 Hook



##### **eslint-plugin-react-hooks** 插件

- 安装 npm install eslint-plugin-react-hooks --save-dev
- Eslint 配置

```javascript
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```

- 单个组件中使用多个 State Hook 和 Effect Hook  React 如何知道 state 对应哪个 useState?
  1. React 依靠 Hook 调用的顺序
  2. 只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。



#### 自定义 Hook

- 作用 :  自定义 Hook 可以将 React 提供的 Hook 组合到 定制的 Hook 中 以复用不同组件之间常见的状态逻辑
- React 两种流行的方式 来共享组件的状态逻辑  **render props** 和 **高阶组件**
- Hook 可以在不增加组建的情况下解决  共享组件之间大的状态逻辑

- 初始代码

```javascript
function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

- 提取自定义 Hook

```javascript
// 第一部分
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}


// 第二部分
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}


// 第三部分
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}

```

- 自定义 Hook 必须以 use 开头吗?

```
 1. 必须如此   不遵循  无法判断某个函数是否包含对其内部 Hook的调用  React 无法自动检查你的 Hook 是否违反了 Hook 规则
```

- 两个组件中使用i想听的 Hook 会共享 state 吗 ?

```
 1.  不会    自定义 Hook 是以重重用状态逻辑的机制 

 2.  每次使用自定义 Hook 时  其中的所有 state 和 effect 都是完全隔离的
```

- 自定义 Hook 如何 获取 独立的 state ?
  1. 每次 调用 Hook 都会获取独立 state   直接调用 useFeroendStatus  从 React 角度 组件只是调用了 useState 和 yse Effect  (一个组件中多次调用 是完全独立的)

- 创建自定义 Hook 就像使用 React 内置的功能一样简单。

 



- useEffect  是异步的会在每一轮渲染结束之后执行
- useEffect  每次更新的时候都会先执行一遍 卸载函数 (effect 返回函数)
- 可以给  useEffect 设置第二参数(数组) ([count, text])  优化性能 当第二参数里面的数据变化时才执行 useEffect
- 可以通过 设置第二参数为 []   只有组件在 开始加载和卸载时 触发











