import axios from 'axios'
import service from './contactApi'
import { Toast } from 'vant'

// service 循环迭代输出不同的请求方法
const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 1000
})

// 包裹请求方法的容器
const Http = {}

// 请求格式 / 参数的统一
for (const key in service) {
  const api = service[key] // url method

  // async 作用: 避免进入回调地狱
  Http[key] = async function (

    /**
     *    请求参数
     *        get, delete: url
     *        put, post, patch : data
     */
    params,

    // 标识是否是  form-data 请求
    isFormData = false,

    // 配置参数
    config = {}

  ) {
    /* let res = null;
    try {
      res = await axios.get('url')
    } catch (error) {
      res = error
    } */

    let newParams = {}

    // 请求的返回值

    // content-type  是否是 form-data 的判断
    if (params && isFormData) {
      // 创建 formdata对象
      newParams = new FormData()

      for (const key in params) {
        newParams.append(key, params[key])
      }
    } else {
      newParams = params
    }
    let response = {}
    // 不同请求的判断
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (error) {
        response = error
      }

    // 如果为 delete 请求方式
    } else if (api.method === 'delete' || api.method === 'get') {
      config.params = newParams
      try {
        response = await instance[api.method](api.url, config)
      } catch (error) {
        response = error
      }
    }

    // 返回响应值
    return response
  }
}

// 添加 请求拦截器
instance.interceptors.request.use(config => {
  /**
   *    Toast.loading({
   *      mask: false, // 阴影
   *      duration: 0, // 持续时间  0为一直存在
   *      forbidClick: true, // 禁止点鸡
   *      message: '加载中 ...'  // 提示信息
   *    })   提示等待
   *
   */
  Toast.loading({
    mask: false,
    duration: 0, // 一直存在
    forbidClick: true, // 禁止点击
    message: '加载中...' // 提示信息
  })
  return config
}, () => {
// 请求错误
  Toast.clear()
  Toast('请求错误，请求稍后重试')
})

// 添加 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功
  Toast.clear()
  return res.data
}, () => {
  Toast.clear()
  Toast('请求错误，请求稍后重试')
})

export default Http
