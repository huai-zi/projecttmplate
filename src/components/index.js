// 组件扩展
const files = require.context('./', true, /\.vue$/);

let components = {};

files.keys().map(item => {
  let _name = item.split(".vue")[0].split("/");
  let name = _name[_name.length - 1];
  components[name] = require(`${item}`).default;
})
export default components
