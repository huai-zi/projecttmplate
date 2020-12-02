
Vue.use(Vuex);
import getters from './getters';
import plugins from './plugins';

// 其组件目录的相对路径，是否查询其子目录，匹配基础组件文件名的正则表达式
const modulesFiles = require.context('./modules', false, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)

  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  plugins,
})

export default store
