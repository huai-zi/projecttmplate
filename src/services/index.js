'use strict'
import request from '@/api';
import messageAlert from '@/util/messageAlert';

/* 用户登录 */
export const userLogin = async (params = {}) => {
  let response = await request({
    "url": "/api/page/getPageContent",
    "method": "put",
    "data": params
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
