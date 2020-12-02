// 组件扩展
const files = require.context('./', true, /\.vue$/);

let components = {};

files.keys().map(item => {
  let name = item.replace(/\.\/\w+\/(\w+)\.vue/g, '$1');
  components[name] = require(`${item}`).default;
})
export default components
