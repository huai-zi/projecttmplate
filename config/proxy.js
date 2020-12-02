// 代理接口
module.exports = {
  "port": 8080,//端口号
  "proxyTable": {
    '/api': {
      // 测试环境
      'target': 'http://xxxx/api', // 接口域名
      'changeOrigin': true, //是否跨域
      'pathRewrite': {
        '^/api': '' //需要rewrite重写的,
      }
    }
  }
}
