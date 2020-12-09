var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹
var filePath = path.resolve(`${__dirname}\\src\\apiPort`);

//调用文件遍历方法  
let interfaces = []
let index = 1;
let errorIndex = 0;
fileDisplay(filePath);
/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表  
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表  
      files.forEach(function (filename) {
        //获取当前文件的绝对路径  
        var filedir = path.join(filePath, filename);

        //根据文件路径获取文件信息，返回一个fs.Stats对象  
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); //是文件  
            var isDir = stats.isDirectory(); //是文件夹  
            if (isFile) {
              // 是文件，文件处理
              let login = require(filedir);
              interfaces.push(...login);
              writeInterface(interfaces, index);

              index++;
            }
            if (isDir) {
              fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件  
            }
          }
        })
      });
    }
  });
}

/**
 * 接口生成函数
 * @param {Array} apiPort 接口json数据
 */
function writeInterface(apiPort, index) {

  let text = `'use strict'
import request from '@/api';
import messageAlert from '@/util/messageAlert';
`;

  apiPort.map((item) => {

    if (!!item.eventName && !!item.url) {
      let method = item.method ? item.method.toLowerCase() : 'get';
      let typeKey = '';
      let urlT = `"${item.url}"`
      
      // 参数类型转换
      switch (item.type) {
        case 'params':
          typeKey = `"params": params`;
          break;
        case 'url':
          typeKey = '';
          urlT = `"${item.url}/" + params`
          break;
        default:
          typeKey = `"data": params`;
          break;
      }
      
      // get默认传参params  post默认传参json
      if(!item.type && method === 'get'){
        typeKey = `"params": params`;
      }

      text += `
/* ${item.remark || '无'} */
export const ${item.eventName} = async (params = {}) => {
  let response = await request({
    "url": ${urlT},
    "method": "${method}",
    ${typeKey}
  });
  response = response['data'] || {};
  
  if (!!response.code) {
    messageAlert({
      code: response.code,
      message: response.message ? response.message : '请通知管理员检查异常！'
    })
  }
  return response
}
`;
    } else {
      // 错误汇总
      errorIndex++;
    }

  });

  fs.writeFile(__dirname + "/src/services/index.js", text, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`第 ${index} 个文件接口汇总完毕！共 ${errorIndex} 个错误，请按照规范进行矫正，否则影响正常使用。`);
  });

}
