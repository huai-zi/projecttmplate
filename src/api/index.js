import messageAlert from '@/util/messageAlert'
import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  timeout: 60000, // 请求超时时间
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

const err = error => {

  messageAlert({
    message: '请求服务超时 , 服务器关闭或系统服务异常 , 请联系管理员 !',
  })
  return Promise.reject(error);
}

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 添加headers到post请求中
  // config.headers.token = 'token';
  return config;
}, err);

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  const status = Number(response.status) || 200;
  if (status !== 200) {
    messageAlert({
      message: `数据请求出现${response.data.code},请联系管理员 !`,
    })
    return;
  }

  return response;
}, err);

export default request
