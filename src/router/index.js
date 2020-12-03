// 引入依赖
import autoRouter from "vue-router-auto";
Vue.use(VueRouter);

let routes = autoRouter({
  // 页面级的.vue存放位置，必传
  rc: require.context("@/views", true, /\.vue$/),
  // '/'的重定向，可选，默认为''
  redirect: "/login",
  // 页面级的.vue存放的文件夹，可选，默认为:views
  rootFile: "views"
});

// 404
routes.push({
  path: "*",
  redirect: "/state"
});

export default new VueRouter({
  mode: "history",
  routes
});
