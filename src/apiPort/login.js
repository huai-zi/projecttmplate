/**
 * 登录相关
 * @param eventName 函数名称，必须唯一 *必填项
 * @param url 请求地址 *必填项
 * @param type 请求类型（默认为get）
 * @param remark 备注
 * @param 特别注意：导出方式只能使用es5语法，切记
 */

module.exports = [{
  eventName: "userLogin",
  url: "/user/login",
  type: "POST",
  remark: "用户登录"
}]
