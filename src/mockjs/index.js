import Mock from 'mockjs';

Mock.setup({
  timeout: '500-800', //接口延时
});

const context = require.context('./services', true, /\.mock.js$/);
context.keys().forEach((key) => {
  Object.keys(context(key)).forEach((paramKey) => {

    let p = context(key)[paramKey];
    for (const items of p.values()) {
      Mock.mock(...Object.values(items));
    }
  });
});
