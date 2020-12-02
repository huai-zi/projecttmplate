// 入口文件，全局方法
import App from './App';
import router from './router';
import store from './store';

import '@/element-ui';
import '@/assets/css/common.less';

// 配置文件
import configuration from '@/config'
Vue.prototype.$config = configuration;

// ui主题（不使用则注释掉，默认注释）
// import '@/theme/index.css';

// 接口hook
import * as services from '@/services';
Vue.prototype.$axios = services;

// 当前环境变量
Vue.prototype.$baseUrl = process.env.baseUrl;

Vue.config.productionTip = false;

/* vue初始化 */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
