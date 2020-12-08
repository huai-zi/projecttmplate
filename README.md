# Vue 模板架构（基于 Webpack 搭建）

vue 项目中，经常会引入路由模块，api 模块，vuex 模块，还有一些公用组件模块。每次都手动输入模块和路径，过程很频繁。此时自动化注册和自动化引入，就显得非常重要。（开发人员只需完成相关页面创建、组件生成、方法处理等功能性业务，无需修改配置文件。例如：引入 xxxxx.vue 到路由配置文件）**（文件夹/配置文件）说明如下**

## 技术栈

- 开发大中型的系统，vue-router 和 vuex 必不可少
- 选用 Element UI 做界面参考
- 日期处理类库 Moment
- 开发环境模拟接口数据 Mockjs
- 工具库选择 lodash（依个人使用，酌情引入）

## 文件结构

```js
config/
--| proxy.js  ---  接口和代理文件
.interface-auto.js  ---  自动化接口处理文件
src/
--| api  ---  axios封装，拦截器header头部内容处理
--| apiPort  ---  json接口源文件
--| assets  ---  资源文件
--| components  ---  可复用组件
--| config/  ---  配置文件夹
----------| index.js  ---  配置title，主题等资源
----------| configuration.js  ---  main.js的分支，将配置文件分割
--| element-ui  ---  项目ui按需加载
--| router  ---  约定式路由，开发无需过问
--| services  ---  接口生成地址，需使用执行命令行interface，请移步package.json
--| store  ---  状态管理仓库
--| theme  ---  自定义主题（在element官网完毕，赋值即可）
--| util  ---  工具类
--| views  ---  页面文件
--| mixins  ---  混入组件
--| mockjs  ---  模拟后台接口数据，数据占位（开发环境中使用，生产环境失效）
--| global.less  ---  全局样式文件
```

## 指令分析

```js
"scripts": {
  "start": "npm run dev",
  "interface": "node .interface-auto.js",  ---  自动化生成接口
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",  ---  热部署开发环境
  "dev_test": "webpack-dev-server --inline --progress --env=test --config build/webpack.dev.conf.js",  ---  开发环境中，test变量
  "dev_prod": "webpack-dev-server --inline --progress --env=prod --config build/webpack.dev.conf.js",  ---  开发环境中，prod变量
  "build": "node build/build.js",
  "build_prod": "node build/build.js prod",  ---  打包，prod变量
  "build_test": "node build/build.js test"  ---  打包，test变量
},
```

## 接口自动化规则

在`src/apiPort文件夹下`，创建模块 js 文件，使用 es5 module.exports 导出配置 json，json 格式如下：（每修改一次配置 json 文件，需要在根目录执行一次 npm run interface，生成新的接口文件）

```js
[
  {
    eventName: "eventxxxx",
    url: "/api/xxx"
  }
  .....
];
```

```js
vue方法使用，this.$axios.eventxxxx("传值对象 或 序列化参数")
```

按照规范进行调用，**注意**确保 `exentName` 的唯一性。否则无法生效。（\*为必填项）

|    参数     |   说明   |         类型         |       可选值        |                                  默认值                                  |
| :---------: | :------: | :------------------: | :-----------------: | :----------------------------------------------------------------------: |
| \*exentName | 函数名称 |        string        |         --          |                                    --                                    |
|    \*url    | 请求路径 |        string        |         --          |                                    --                                    |
|   method    | 请求类型 |        string        | get/post/delete/put |                                   get                                    |
|    type     | 传参类型 | object/string/number |     json/params     | get 类型下 params、post 类型下 json、delete 类型下 json、put 类型下 json |
|   remark    | 方法说明 |        string        |         --          |                                    --                                    |

## 自动化 meta 标签

一般情况下，如果需要使用动态 meta，添加页面 title、处理显示按钮等业务。可以手动自行配置，如下：

```js
> 在vue页面中data属性赋值
data(){
  return {
    title: "页面meta",
    meta: [
      {
        name: "name属性",
        content: "contetn属性"
      }
    ]
  }
}
```

## 全局变量介绍

```js
this.$config  =>  配置文件信息
this.$axios  =>  接口调用函数集合
this.$baseUrl  =>  环境变量
```

## 注意事项

- 添加或修改完/apiPort 接口，请使用 npm run interface，生成接口
- 如若没有特殊要求，切勿修改 components/index.js、store/index.js 文件

## vue 约定式路由规则（同`Nuxt`的路由一样，开发人员请按照规则制定路由）

### 假设 views 的目录结构如下：

```js
views/
--| login.vue
--| home.vue
--| user/
-----| index.vue
-----| edit.vue
-----| info.vue
```

### router 自动生成的路由配置如下：

```js
[
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login.vue")
  },
  {
    name: "home",
    path: "/home",
    component: () => import("@/views/home.vue")
  },
  {
    name: "user",
    path: "/user",
    component: () => import("@/views/user/index.vue")
  },
  {
    name: "user-info",
    path: "/user/info",
    component: () => import("@/views/user/info.vue")
  },
  {
    name: "user-edit",
    path: "/user/edit",
    component: () => import("@/views/user/edit.vue")
  }
];
```

## 嵌套路由

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个**与该文件同名**的目录用来存放子视图组件。

### 假设 views 的目录结构如下：

```js
views/
--| login.vue
--| home.vue
--| home/
-----| index.vue
-----| about.vue
-----| product.vue
--| user/
-----| index.vue
-----| info.vue

```

### router 自动生成的路由配置如下：

```js
[
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/home",
    component: () => import("@/views/home.vue"),
    children: [
      {
        name: "home-index",
        path: "",
        component: () => import("@/views/home/index.vue")
      },
      {
        name: "home-about",
        path: "about",
        component: () => import("@/views/home/about.vue")
      },
      {
        name: "home-product",
        path: "product",
        component: () => import("@/views/home/product.vue")
      }
    ]
  },
  {
    name: "user",
    path: "/user",
    component: () => import("@/views/user/index.vue")
  },
  {
    name: "user-info",
    path: "/user/info",
    component: () => import("@/views/user/info.vue")
  }
];
```

## 动态嵌套路由

### 假设 views 的目录结构如下：

```js
views/
--| login.vue
--| home.vue
--| home/
-----| _id.vue
-----| about.vue
--| user/
-----| user-edit.vue

```

### router 自动生成的路由配置如下：

```js
[
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login.vue")
  },
  {
    name: "home",
    path: "/home",
    component: () => import("@/views/home.vue"),
    children: [
      {
        name: "home-id",
        path: ":id",
        component: () => import("@/views/home/_id.vue")
      },
      {
        name: "home-about",
        path: "about",
        component: () => import("@/views/home/about.vue")
      }
    ]
  },
  {
    name: "user-edit",
    path: "/user/edit",
    component: () => import("@/views/user/user-edit.vue")
  }
];
```
