/**
 * 登录相关
 * @param eventName 函数名称，必须唯一 *必填项
 * @param url 请求地址 *必填项
 * @param type 传参类型（默认为get为params   post为json,可选参数json/params）
 * @param method 请求类型（默认为get）
 * @param remark 备注
 * @param 特别注意：导出方式只能使用es5语法，切记
 */

let host = '/mock';
let url = `${host}/getUser`

module.exports = [{
  eventName: "userEvnent",
  url: url,
  method: "get",
  remark: "用户登录"
}]
