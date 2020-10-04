
## Redux 概述

#### 简介

 -   用于 js 状态容器   提供可预测的状态管理

 -   Redux 构建一致化应用   运行于不同的环境 (客户端, 服务器, 原生应用)  易于测试

 -   Redux 支持其他界面库  体小 (2KB)



####  作用

 -   js 单页面开发复杂   js管理更多的 (state)  包括 (服务器响应, 缓存数据, 本地生成为持久化到服务器的数据,  UI状态等)

 -   Redux 解决状态管理混乱



#### 三大核心

 -  **单一数据源**

        整个应用的 state 被存储在一颗 object tree 中  这个 object tree 只存在于唯一一个 store 中

 -  **State是只读的**
    
        唯一改变 state 的方法就是触发 action ,    action是一个用于描述易发生事件的普通对象

 -  **使用纯函数来执行修改**

        便些 reducers 来描述 action state  tree

        Reducers 只是一些纯函数   接收 state 和 action  并返回新的 state   可以复用, 可以控制顺序  传入附加参数



## Redux 组成

#### State 状态

 -   React 开发项目的时候  可以把State 分类三类

     1. DomainDate:  服务端的数据

     2. UI State:  决定当前 UI 展示的组件

     3. App State:  App级别的状态


 - Action - 事件

   Action 是把数据从应用传到 store 的载体   (store数据的唯一来源)  (一般通过 store.dispatch() 和 action传递给 store)        

				  store.dispatch(action)

Component -------------------------------------->  Store
                             


#### action 特点

 -   本质是一个 js 普通对象

 -   对象内部必须要有一个 type 属性来表示要执行的动作

 -   多数情况   type 会被定义成字符串常量

 -   除了 type字段  action 的解构随意进行定义

 -   action 只是描述了有事情要发生  并没有描述如何去更新 state

```javascript
// action
{
    type: '字符串常量',
    info: {...},
    isLoading: true
    ...
}


// action 创建函数

function addAction (params) {
    
    // 返回 action 对象
    return {
        type: 'add',

        ...params
    }
}
```


#### Reducer 

 -   本质是一个函数  响应发送过来的 actions  经过处理  把 state 发送给 Store

 -  Reducer 函数  需要 return返回值   Store 才能接收数据

    函数会接收两个参数   一个是初始化 state  第二个参数是 action

```javascript
const initState = {....}

rootReducer = { state = initState, action } => { ... 
    return { ... }
}
```
​			store.dispatch (action)  触发action                                 return 传递值

Component --------------------------------------------------------->   Reducer(state, action)   ------------------> Store =createStore(reducer)
                      <---------------------------------------------------------

​			   store.getState() 获取数据        


#### Store

 -   Store  就是把 action 与 reducer 联系到一起的对象

 -   主要职责:

     1.  维持应用的 state

     2.  提供 getState()  方法获取 state

     3.  提供 dispatch()  方法发送 action

     4.  通过 subscribe() 来注册监听

     5.  通过 subscribe() 返回值来注销监听

```javascript
import { createStore } from 'redux'

const store = createStore(传递reducer)
```

####  步骤

 -    构建 action  通过创建一个函数   返回一个对象    注意需要携带 type 属性

 -    构建 reducer  用来响应   action   然后通过 return  把数据传回给 store

 -    利用  createStore 构建  store   构建的时候  传递我们写好的 reducer

 -    利用  store.subscribe()   注册监听

 -    当我们利用  store.dispatch()  发送一个 action 的时候就能触发我们的监听了  在里面利用  store.getState()   就能拿到数据

## React-Redux



- Redux 与 React  之间并没有关系    Redux 支持 React  Angular jQuery 甚至是 javascr
- React-Reudux  Redux 官方用于适配 React 的绑定库
- react-redux  能够使  React 组件从 Redux store  中很方便的读取数据   并且向  store 中分发 actions 更新数据

#### React-Redux 两个重要成员

React 框架是以 组件进行驱动 

- **Provider**  `组件`
  - 该组件  能够使整个 app 都能获取到 store 中的数据

- **connect**  `方法`
  - 该方法能够使组件跟 store  进行关联

#### Provider

- Provider 包裹在根组件最外层   使所有子组件都可以拿到 State
- Provider 接收 store 作为 props  通过 context 往下传递   React 中任何组件可以通过 context 获取 store

**React-Redux Provider**

- 解决弊端:  容器组件可能存在很深的层级  防止一层一层的去传递 store
- 作用:  让组件拿到 store
- 原理:  react 中的  context

#### connect

- Provider  内部组件 如果想要 使用到  state 中的数据  就必须要 connect 进行一层包裹封装  需要把 connect 加强
- connect  方便从组件中 获取到 store中的 state



-    **store文件**
```javascript
// 导入 创建 store 方法
import { createStore } from 'redux'
// 导入 reducer
import { reducer } from '../reducer'
export default createStore(reducer)
```

-    **reducer文件**

```javascript

/**
 *   接收两个参数
 *          第一个参数  state
 *          第二个参数  action
 */

 const initState = {
     count: 1
 }

 // reducer 接收 action  进行逻辑处理

 // 判断 action

 // 如果 action 是符合我们需求的 action  return 新的 state
exports.reducer = (state = initState, action) => {

    console.log( 'reducer', action)

    // reducer 返回了 新的 state 才能获取到

    switch (action.type) {
        case 'add_action':
            
            return {
                count: state.count+1
            }
    
        default:
            return state
    }

    return state
}
```

-    **ComA组件**
```javascript
import React, { Component } from 'react'

// 导入 connect 
import { connect } from 'react-redux'

class ComA extends Component {

    handleClick() {
        console.log( 'ComA', this.props.sendAction)

        // 发送 action
        this.props.sendAction()
    }

    render() {
        return (
            <>
                <button onClick={this.handleClick.bind(this)} > + </button>
            </>
        )
    }
}

/**
 *  必须要有一个返回值    返回值为 对象
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {

    return {

        sendAction: () => {

            // 利用dispatch 发送  action 
            // 定义一个 type 属性

            dispatch({
                type: "add_action"
            })
        }
    }
}


// 组件A 发送方   实现 connect 第二个参数
export default  connect(null, mapDispatchToProps)(ComA)
```


-    **ComB组件**

```javascript
import React, { Component } from 'react'
import { connect } from 'react-redux'


class ComB extends Component {
    render() {

        console.log('ComB', this.props)

        return (
            <div>
                {this.props.count}
            </div>
        )
    }
}

/**
 * 接收两个参数
 * @param {*} state 
 */
 const mapStateToProps = (state) => {

    console.log('ComB', state)

    //  return  组件才能获取数据
    return state
}


// B组件为 接收方   需要实现 connect 方法 第一个参数

export default connect(mapStateToProps)(ComB)
```



**App.js**

```javascript
import React from 'react';
import ComA from './react-redux/ComA/index';
import ComB from './react-redux/ComB';

import store from './react-redux/store'



//   导入 Provider 组件 利用这个组件 包裹结构   达到统一维护 store 效果
// import { Provider } from 'react-redux'

function App() {
	return (
		<Provider store={store}>
			<div>
				<ComA /> 
				<ComB />
			</div>
		</Provider>
	);
}

export default App;
```





#### Provider  组件实现

 -   导入 Provider

 -   利用Provider 组件 对整个结构进行包裹

 -   给 Provider 组件 设置 Store 属性   这个值就是通过 createStore 构建出啦的 store 实例对象


-   **App.js文件**
```javascript
//   导入 Provider 组件 利用这个组件 包裹结构   达到统一维护 store 效果
import { Provider } from 'react-redux'

function App() {
	return (
		<Provider store={store}>
			<div>
				{/* <Home /> */}
				<Index />
				<ComB />
			</div>
		</Provider>
	);
}
```


#### connect  参数说明

 **参数名 :**

-   **mapStateToProps(state, ownProps)**  

     -  接收 action

     -  类型 function

     -  允许将 store 中的数据作为 props绑定到组件上   

     -  state: redux 中的 store

     -  ownProps :  自己的 props


-   **mapDispatchToProps(dispatch, ownProps)** 

     -  分发 action

     -  类型 function

     -  将 action 中的数据作为 props 绑定到函数中

     -  dispatch: store.dispatch()  

     -  ownProps :  自己的 props


-   mergeProps(stateProps, dispatchProps, ownProps)

     -  类型 function

     -  stateProps, disoatchProps 都需要和 ownProps merge(混合)之后才能被赋给组件

     -  若不传递参数   connect 使用 Object.assign 替代该方法  (默认)


-   options 

     -  类型 Object

     -  定制 connector 行为





##### 发送方的步骤

- 通过 dispatch 发送 action
- 导入 connect 方法
- 利用  connect 对发送方组件进行加强   然后导出
- connect 第一个参数为接收方  以 null 代替
- 实现第二个参数   返回对象  定义属性
- 在组件内部  通过 this.props 拿到对应的触发 action 的函数对象







#### send-love 案例

**App.js**

```javascript
import React from 'react'
import Boy from './pages/Boy'
import Girl from './pages/Girl'

// 导入 store
import store from './store'

// 导入 provider
import { Provider } from 'react-redux'

import './App.css'

export const App = () => {
    return (
        <>
            <Provider store={store}>
                <div className="boy">
                    <Boy />
                </div>
                <div className="girl">
                    <Girl />
                </div>
            </Provider>
        </>
    )
}
```



**reducer.js**

```javascript
// 定义初始化 state 
const initState = {
    status: false
}

exports.loveReducer = (state = initState, action) => {


    switch (action.type) {
        case 'send_love':

            return {
                status: true
            }

        case 'stop_love':

            return {
                status: false
            }

        default:
            return state;
    }
    
}
```



**store.js**

```javascript
// 导入 createStore
import { createStore } from 'redux'

// 导入我们的 reducer
import { loveReducer } from '../reducer'


// 通过 create 创建 store
export default createStore(loveReducer)
```



**Boy.jsx**

```javascript
import React, { Component } from 'react'
import { connect } from 'react-redux'


import defaultImg from '../../asstes/img/a1.jpg'
import sendImg from '../../asstes/img/a2.gif'


class Boy extends Component {

    // 定义 UI 级别的 state
    state = {
        isSend: false
    }

    handleClcik() {

        const { isSend } = this.state

        // 需要取反  默认 false    点击时渠道的状态是还未更新的状态

        isSend ? this.props.stopLove() : this.props.sendLove()


        this.setState({
            isSend: !isSend
        })
    }

    render() {

        const { isSend } = this.state

        return (
            <>
                <div>
                    <img src={isSend ? sendImg : defaultImg} alt="" />
                    <button onClick={this.handleClcik.bind(this)}>{isSend ? '停止发射' : '发射爱心'}</button>
                </div>
            </>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    // 要有一个返回值  这个对象会返回到组件的内部  通过 this.props 可以拿到

    console.log('boy', dispatch)

    return {
        sendLove: () => {
            dispatch({
                type: 'send_love'
            })
        },
        stopLove: () => {
            dispatch({
                type: 'stop_love'
            })
        }
    }

}

// 组件加强并导出
export default connect(null, mapDispatchToProps)(Boy)
```



**Girl.jsx**

```javascript
import React, { Component } from 'react'
import { connect } from 'react-redux'

import defaultImg from '../../asstes/img/b1.jpg'
import reciveImg from '../../asstes/img/b2.jpg'



class Girl extends Component {

    render() {

        console.log('girl', this.props)
        return (
            <>
                <img src={this.props.status ? reciveImg : defaultImg} alt=""/>
            </>
        )
    }
}

/**
 * 
 * @param {*} state 就是 state 返回过来的状态
 */
const mapStateToProps = (state) => {

    return state
}

export default connect(mapStateToProps)(Girl)
```

