import store from '@/store';

import {
  Notification
} from 'element-ui';

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 添加headers到post请求中
  // config.headers.token = 'token';

  store.commit('login/loading', true);
  return config;

}, function (error) {
  // 对请求错误做些什么
  store.commit('login/loading', false);
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  store.commit('login/loading', false);

  const status = Number(response.status) || 200;
  if (status !== 200) {
    Notification({
      'message': `数据请求出现${response.data.code},请联系管理员 !`,
      'type': 'error'
    });
    return;
  }

  return response;
}, function (error) {
  store.commit('login/loading', false);

  // 对响应错误做点什么，402为后台session值过期
  Notification({
    'message': '请求服务超时 , 服务器关闭或系统服务异常 , 请联系管理员 !',
    'type': 'error',
    'duration': 5000
  });

  return Promise.reject(error);
});

export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  post(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, config).then(function (data) {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(function (data) {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
