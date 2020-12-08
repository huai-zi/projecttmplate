// 入口文件，全局方法
import Vue from 'vue'
import App from './App';
import store from './store';

// 配置文件 修改配置请移步 config/configuration
import router from '@/config/configuration'

Vue.config.productionTip = false;

/* vue初始化 */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
