// Vue 配置页面
import NProgress from 'nprogress';
import router from '@/router';

let {
  MOCK
} = process.env;

!MOCK || require('@/mockjs');

// 页面载入进度条
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach((to, from) => {
  NProgress.done();
});

import '@/element-ui';
import '@/assets/css/common.less';

// 配置文件
import configuration from '@/config'
Vue.prototype.$config = configuration;

// ui主题（不使用则注释掉，默认注释）
// import '@/theme/index.css';

// 动态meta
import Meta from 'vue-meta'
Vue.use(Meta)

// 接口hook
import * as services from '@/services';
Vue.prototype.$axios = services;

// 当前环境变量
Vue.prototype.$baseUrl = process.env.baseUrl;

// 全局mixins
import globalMixin from '@/mixins';
Vue.mixin(globalMixin)

export default router
