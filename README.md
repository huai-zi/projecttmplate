# Vue 模板案例

vue 项目中，经常会引入路由模块，api 模块，vuex 模块，还有一些公用组件模块。每次都手动输入模块和路径，过程很频繁。此时自动化注册和自动化引入，就显得非常重要。**（文件夹/配置文件）说明如下**

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
--| config  ---  配置文件。如：修改主题，项目名称等
--| element-ui  ---  项目ui按需加载
--| router  ---  约定式路由，开发无需过问
--| services  ---  接口生成地址，需使用命令行interface，请移步指令分析
--| store  ---  状态管理仓库
--| theme  ---  自定义主题（在element官网完毕，赋值即可）
--| util  ---  工具类
--| views  ---  页面文件
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

## 注意事项
- 添加或修改完/apiPort接口，请使用npm run interface，生成接口
- 如若没有特殊要求，切勿修改components/index.js、store/index.js文件

## vue 约定式路由规则（同`Nuxt`的路由一样）

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

### 那么，vue-router-auto 自动生成的路由配置如下：

```js
[
    {
        name:'login',
        path:'/login',
        component: () => import('@/views/login.vue')
    },
    {
        name:'home',
        path:'/home',
        component: () => import('@/views/home.vue')
    },
    {
        name:'user',
        path:'/user',
        component: () => import('@/views/user/index.vue')
    },
    {
        name:'user-info',
        path:'/user/info',
        component: () => import('@/views/user/info.vue')
    },
    {
        name:'user-edit',
        path:'/user/edit',
        component: () => import('@/views/user/edit.vue')
    }
]
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

### 那么，vue-router-auto 自动生成的路由配置如下：

```js
[
    {
        name:'login',
        path:'/login',
        component: () => import('@/views/login.vue')
    },
    {
        path:'/home',
        component: () => import('@/views/home.vue'),
        children:[
            {
                name:'home-index',
                path:'',
                component: () => import('@/views/home/index.vue')
            },
            {
                name:'home-about',
                path:'about',
                component: () => import('@/views/home/about.vue')
            },
            {
                name:'home-product',
                path:'product',
                component: () => import('@/views/home/product.vue')
            }
        ]
    },
    {
        name:'user',
        path:'/user',
        component: () => import('@/views/user/index.vue')
    },
    {
        name:'user-info',
        path:'/user/info',
        component: () => import('@/views/user/info.vue')
    }
]
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

### 那么，vue-router-auto 自动生成的路由配置如下：

```js
[
    {
        name:'login',
        path:'/login',
        component: () => import('@/views/login.vue')
    },
    {
        name:'home',
        path:'/home',
        component: () => import('@/views/home.vue'),
        children:[
            {
                name:'home-id',
                path:':id',
                component: () => import('@/views/home/_id.vue')
            },
            {
                name:'home-about',
                path:'about',
                component: () => import('@/views/home/about.vue')
            }
        ]
    },
    {
        name:'user-edit',
        path:'/user/edit',
        component: () => import('@/views/user/user-edit.vue')
    }
]
```