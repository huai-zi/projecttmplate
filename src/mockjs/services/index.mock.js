/** 
 * mock模拟接口数据，请按照规范，文件名都已*.mock.js结尾
 * @param {string} url 接口名称
 * @param {string} method 接口类型
 * @param {Array|Object|Number|String} data 接口数据
 *   */
import Mock from 'mockjs';

const {
  Random
} = Mock;

export default [{
  url: '/mock/getUser',
  method: 'get',
  data: {
    'range|50-100': 50,
    'data|10': [{
      // 唯一 ID
      id: '@guid()',
      // 生成一个中文名字
      cname: '@cname()',
      // 生成一个 url
      url: '@url()',
      // 生成一个地址
      county: Mock.mock('@county(true)'),
      // 从数组中随机选择一个值
      'array|1': ['A', 'B', 'C', 'D', 'E'],
      // 随机生成一个时间
      time: '@datetime()',
      // 生成一张图片
      image: Random.dataImage('200x100', 'Mock Image'),
    }, ],
  }
}];
