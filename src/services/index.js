'use strict'
import http from '@/api';
import messageAlert from '@/util/messageAlert';

/* 用户登录 */
export const userLogin = async (params = {}) => {
  let response = await http.post('/user/login', params);
  response = response['data'] || {};
  
  if (!!response.code) {
    messageAlert({
      code: response.code,
      message: response.message ? response.message : '请通知管理员检查异常！'
    })
  }
  return response
}
