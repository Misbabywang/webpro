## 传统网站中存在的问题

网速慢的情况下 页面加载时间长 用户只能等待
表单提交后



## Ajax 概述

浏览器提供的一套方法 可实现页面无刷新更新数据  提高用户浏览网站应用的体验



## Ajax 的应用场景

1. 页面上拉加载更多数据
2. 列表数据无刷新分页
3. 列表项离开焦点数据验证
4. 搜索框提示文字下拉列表



## Ajax 

Ajax 需要运行在网站环境才能生效`




## Ajax的实现步骤
1. 创建 Ajax 对象

```javascript
var xhr = new XMLHttpRequest();
```

2. 告诉 Ajax 请求地址和请求方式
```javascript
xhr.open('get', 'http://www.example.com')
```

3. 发送请求
```javascript
xhr.send();
```

4. 获取服务端给与客户端的响应数据
```javascript
xhr.onload = function() {
console.log(xhr.responseText)
}
```

## Ajax 状态码

0 : 请求未初始化(未调用 open方法)
1 : 请求已经建立 (但是还没有发送  未调用send())
2 : 请求已经发送
3 : 请求正在处理中 通常响应中已经有部分数据可以使用
4 : 服务器端的现有数据已经接收完成

onreadystatechange 事件



## Ajax 错误处理
    1. 网络畅通 服务器端能接收请求  服务端返回接关不是预期结果
        判断服务器端返回带状态码  分别进行处理 xhr.status 获取http状态码
    
    2. 网络畅通 服务端没有接收到请求  返回 404 状态码
        检查请求地址是否错误
    
    3. 网络畅通 服务器端能接收到请求 服务端返回 500 状态码
        服务器端错误 找后端程序员进行沟通
    
    4. 网络中断 请求无法发送到服务端
        会触发xhr对象下面的onerror事件，在onerror事件处理函数中对错误进行处理。
    
    排查顺序
        看 http 状态码
        看 console.log() 前端错误
        net::ERR_CONNECTION_REFUSED 接口没有访问到


## Ajax 封装函数

    问题 : 发送一次请求代码过多 发送多次请求代码荣誉且重复
    解决方案 : 将请求代码封装到函数中 发请求时调用函数即可
```javascript
ajax({
type: 'get',
url: 'http://www.example.com',
success: function(data) {
        console.log(data)
    }
})

/*
请求参数要考虑的问题
    1. 请求参数位置的问题
        将请求参数传递到 ajax 函数内部  
        在函数内部根据请求方式不同将请求参数防止在不同的位置
        get 放在请求地址后面
        post 放在 send 方法中
    2. 请求参数格式问题 
        参数名称=参数值&参数名称=参数值
        application/x-www-form-urlencoded
        name=zhangsna&age=20
        application/json
        {参数名称 : 参数值, 参数名称 : 参数值}
        {name : 'zhangsna', age : 20}
        传递对象数据类型对于函数的调用者更加友好
        在函数内部对象数据类型转换为字符串数据类型更加方便
*/ 
```



## Ajax 请求限制

Ajax 只能向自己的服务器发送请求



#### 同源含义 

**如果两个页面拥有相同的 协议 域名 端口 这两个页面就属于同一个源**

`例如:`

```html

http://www.example.com/dir/page.html


http://www.example.com/dir2/other.html      // 同源 
http://v2.www.example.com/dir2/other.html   // 不同源  (域名不同)
http://example.com/dir2/other.html          // 不同源  (域名不同)
http://www.example.com:81/dir2/other.html   // 不同源  (端口不同)   
https://www.example.com/dir2/other.html     // 不同源  (协议不同)   
```


## 同源政策

 - 目的: 保证用户信息的安全,防止恶意的网站窃取数据  不能跨服务器访问 Cookie
 - 同源政策规定: 无法向非同源地址发送 Ajax 请求 (浏览器拒绝接收)


## 解决同源限制问题

 1. **使用 JSONP 解决同源限制问题**

    jsonp 是 json with padding 缩写   不属于 Ajax 请求  可以模拟 AjAX 请求

     - 将不同源的服务器端请求地址写在 script 标签的 src 属性中
    ```javascript
    <script src="www.example.com"></script>
    ```

     - 服务器端响应数据必须是一个函数的调用 真正要发送给客户端的数据要作为函数调用的参数
    ```javascript
    const data = 'fn({name: '张三', age: 20})';
    res.send(data);
    ```

     - 在客户端全局作用域下定义函数 fn
    ```javascript
    function fn(data) {}
    ```

     - 在 fn 函数内部对服务器端返回的数据进行处理
    ```javascript
    function fn(data) {console.log(data)}
    ```


##### JSONP 代码优化
 - 客户端需要将函数名称传递到服务器端


 2. **CORS 跨域资源共享 (解决同源限制问题)**

        CORS: Cross-origin resource sharing 跨域资源共享
        允许浏览器向跨域服务器发送 Ajax 请求

                             跨域请求                                           
            |------------------------------------------------> |               |                         
            |              请求头(origin)                                    |           
            |                                                  |          
            |                                                  |          
            |                                                  |          
            |                                                  |          
    浏览器端 |                                                  | 服务器端             
            |                                                  |          
            |                                                  |          
            |                                                  |          
            |                                                  |          
            |                                                  |          
            |                  同意 跨域 响应                    |          
            |<-------------------------------------------------|          
            |        响应头 (Access-Control-Access-Origin)      |          

Access-Control-Access-Origin
访问     控制     允许    源


请求
origin:  http://localhost:3000


响应
Access-Control-Allow-Origin: 'http://localhost:3000'  允许 http://localhost:3000   跨域访问
Access-Control-Allow-Origin: '*'  允许 全部客户端进行 跨域访问




 3. **访问非同源数据 服务端解决方案**

同源政策是浏览器给予 AjAX 奇数的限制 服务器端是不存在同源政策限制

           请求                    请求
A浏览  =============>  A服务  ==============> B服务
器端   <=============  器端   <============== 器端 
            响应                     响应



