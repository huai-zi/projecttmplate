'use strict'
import request from '@/api';
import messageAlert from '@/util/messageAlert';

/* 用户登录 */
export const userEvnent = async (params = {}) => {
  let response = await request({
    "url": "/mock/getUser",
    "method": "get",
    "params": params
  });
  response = response['data'] || {};
  
  if (!!response.code) {
    messageAlert({
      code: response.code,
      message: response.message ? response.message : '请通知管理员检查异常！'
    })
  }
  return response
}

/* 用户登录 */
export const userEvnent1 = async (params = {}) => {
  let response = await request({
    "url": "/mock/getUser/" + params,
    "method": "delete",
    
  });
  response = response['data'] || {};
  
  if (!!response.code) {
    messageAlert({
      code: response.code,
      message: response.message ? response.message : '请通知管理员检查异常！'
    })
  }
  return response
}
