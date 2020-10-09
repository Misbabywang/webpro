# axios

#### Axios 是什么

**Axios 是一个基于 promis 的 http库**
**可以用于 浏览器 和 node.js**

#### Axios 特效

- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON数据
- 客户端支持防御 XSRF攻击

#### Axios 基础用法(get post put等请求方法)

#### axios 请求方法: get post put patch delete



 * 

```javascript
import axios from 'axios'

/**
* axios 请求方法 :  gte post  put patch delete
* get :  获取数据
* post:  提交数据  (表单提交 + 文件上传)  一般用于新建
* put:   更新数据(编辑数据) 所有数据都推送到服务端  一般用于更新
* patch: 更新数据(编辑数据) 只将修改的数据推送到服务端  数据量较大使用 patch
* delete: 删除数据
* 服务端定义请求方式
*/


export default {
  name: 'axios2-2',

  components: {},
  created () {
    // get 请求
    // http:localhost:8080/data.json?id=12
    axios
      .get('/data.json', {
        params: {
          id: 12
        }
      })
      .then((res) => console.log(res))
    axios({
      method: 'get',
      url: '/data.json',
      params: {
        id: 12
      }
    }).then((res) => console.log(res)) 
    
    
    // post 请求
    
// axios.post(url, data数据, config)
/** data 数据格式有两种
 *    form-data(用于表单提交, 图片上传,文件上传)
 *    applicition/json 格式
 */
const data = {
  id: 12
}
 axios.post('/post', data).then(res => console.log(res))
axios({
  method: 'post',
  url: '/post',
  data: data
}).then(res => console.log(res))
// form-data 请求
const formData = new FormData()
for (const key in data) {
  formData.append(key, data[key])
}
axios.post('/post', formData).then(res => console.log(res)) 

// put 请求
axios.put('/put', data).then(res => console.log(res))

// patch 请求
axios.patch('/patch', data).then(res => console.log(res))

// put post patch 请求方法的区别

// delete 请求
// axios.delete(url, config)

// 参数 url 进行拼接
axios.delete('/delete', {
  params: {
    id: 12
  }
}).then(res => console.log(res))

// 参数存在于 请求体里
axios.delete('/delete', {
  data: {
    id: 12
  }
}).then(res => console.log(res))

axios({
  method: 'delete',
  url: '/delete',
  params: {}, // url 拼接
  data: {} // 请求体
}).then(res => console.log(res))
  }
}
```




区别:  

get 和 delete 请求方式 只包含 url 和 config 两个参数
put post patch 请求方式 包含 三个 参数 url data(请求数据) config
put post patch 三个请求参数 只存在于 使用方法 和 请求方式的区别
form-data 和 applicition/json 的区别
delete请求方式 的两种区别



#### 并发请求

```javascript
/**
 *    并发请求: 同时进行多个请求, 并统一处理返回值
 *    应用场景  需要请求多个接口  同时处理接口返回值
 *    axios 两个方法:
 *    axios.all([])  参数为数组   储存 请求
 *	  axios.spread()  参数为回调函数  回调函数的参数 为对应的请求 进行分割处理
 */


created () {
    // axios.get('/data.json').then(res => console.log(res))
    axios.all(
      [
        axios.get('/data.json'),
        axios.get('/city.json')
      ]
    ).then(
      axios.spread((dataRes, cityRes) => console.log(dataRes, cityRes))
    )
  }
```







## Axios 进阶用法(实例, 配置, 拦截器, 取消请求)



#### axios 实例

```javascript

/**
 *    axios 实例
 *    应用场景:  后端接口地址多个  超时时长不一样
 */

created () {
    const instance = axios.create({
      baseURL: 'http://localhost:8080', timeout: 1000
    })
    const axios2 = axios.create({
      baseURL: 'http://localhost:9000', timeout: 5000
    })
    instance.get('/data.json').then(res => console.log(res))
    axios2.get('/data.json').then(res => console.log(res))
  }
```





#### axios 配置参数有哪些 

```javascript
 axios.create({
      // 基本参数
      baseURL: 'http://localhost:8080', // 请求的域名  基本地址
      timeout: 1000, // 请求超时时长 (ms)
      url: '/data.json', // 请求路径
      method: 'get, post, put, patch, delete', // 请求方法
      headers: {
        token: ''
      }, // 请求头  携带参数
      params: {}, // 会将请求参数 拼接在 url
      data: {} // 会将请求参数 放在 请求体里
    })



/**
     *    axios 配置方式 :
     *        1.  axios 全局配置
     *              axios.defaults.基本参数
     *              axios.defaults.timeout = 1000
     *              axios.defaults.baseURL = 'http://localhost:8080'
     *
     *        2.  axios 实例配置
     *              let instance = axios.create(配置参数) // 若无配置参数  使用全局参数
     *              instance.defaults.timeout = 3000  // 修改配置参数
     *
     *        3.  axios 请求配置
     *              let instance = axios.create(配置参数)
     *              instance.get('/data.json, {
     *                  timeout: 5000
     *              })
     *
     *
     *        配置参数 优先级 :  低  全局配置 -->  实例配置  --> 请求配置    高
     */


// 实际开发  生成实例
    const instance = axios.create({
      baseURL: 'http://localhost:9090',
      timeout: 1000
    })
    const instance1 = axios.create({
      baseURL: 'http://localhost:9091',
      timeout: 3000
    })
    // baseURL timeout url method params
    instance.get('/contactList', {
      params: {}
    }).then(res => console.log(res))
    // baseURL timeout url method params
    instance1.get('/orderList', {
      timeout: 5000
    }).then(res => console.log(res))
  }
```



#### axios 拦截器

```javascript
/**
 *    拦截器定义:  在请求或响应被处理前拦截
 *    拦截器分类 :  请求拦截器 和 响应拦截器
 */


import axios from 'axios'

export default {
  name: 'axios3-3',
  components: {
  },
  created () {
    // 请求拦截器
    // 请求拦截器的 use 方法  包含两个 回调函数 请求发送前 和 请求错误时
    axios.interceptors.request.use(config => {
      // 在发送请求前
      return config
    }, err => {
      // 在请求错误
      return Promise.reject(err)
    })

    // 响应拦截器
    axios.interceptors.response.use(res => {
      // 请求成功 对响应数据做处理
      return res // TODO:请求成功的数据
    }, err => {
      // 响应错误
      return Promise.reject(err) // FIXME:响应错误的数据
    })

    axios.get().then(res => {
      // TODO:接收请求成功的数据
      console.log(res)
    }).catch(err => {
      console.log(err) // FIXME: 接收响应错误的数据
    })

    // 取消拦截器 (了解)

    // 存放拦截器
    const interceptors = axios.interceptors.request.use(config => {
      config.headers = {
        auth: true
      }
      return config
    })

    // 取消拦截器
    axios.interceptors.request.eject(interceptors)

    // 例子
    // 登陆状态  (token: '')

    // 访问需要登录的接口
    const instance = axios.create({})
    instance.interceptors.request.use(
      config => {
        config.header.token = ''
        return config
      }
    )

    // 访问不需要登录的接口
    const newInstance = axios.create({})

    // 移动端开发
    const instance_phone = axios.create({})

    // 请求前等待弹窗
    instance_phone.interceptors.request.use(
      config => {
        $('$modal').show()
        return config
      }
    )
    // 响应后 弹窗关闭
    instance_phone.interceptors.response.use(
      res => {
        $('$modal').hide()
        return config
      })
  }
```



#### axios 错误处理: 请求错误时进行的处理 

```javascript
created () {
    // 请求拦截器
    axios.interceptors.request.use(
      config => {
        return config
      }, err => {
        return Promise.reject(err)
      }
    )
    // 响应拦截器
    axios.interceptors.response.use(
      res => {
        return res
      }, err => {
        return Promise.reject(err)
      }
    )
    axios.get('/data.json')
      .then(res => console.log(res))
      .catch(err => console.log(err))

    // 例子 :  实际开发过程中 一般添加统一的错误处理
    const instance = axios.create({})
    instance.intercetors.request.use(
      config => {
        return config
      }, err => {
        // 请求错误  一般http 状态码 以 4 开头
        // 常见: 401超时 404 Not Found
        return Promise.reject(err)
      }
    )
    instance.intercetors.response.use(
      res => {
        return res
      }, err => {
        // 响应错误处理  一般 http 状态码
        // 常见: 500 系统错误   502 系统重启
        $('#modal').show()
        setTimeout(() => {
          $('#modal').hide()
        }, 2000)
        return Promise.reject(err)
      }
  

    instance.get('/data.json')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
```





#### Axios 进一步封装  在项目中的实际应用