// 表单序列化
export const serialize = data => {
  let list = [];

  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`);
  });
  return list.join('&');
};
/**
 * 修改标题
 * @param {String} title 
 */
export const headTitle = title => {
  document.getElementsByTagName("title")[0].innerText = title;
}

/**
 * 对象深拷贝
 */
export const deepClone = data => {
  // 数据拷贝
  var t = typeof (data),
    o, i, ni;

  if (Array.isArray(data)) {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (Array.isArray(t)) {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(deepClone(data[i]));
    }
    if (o.length === 0) {
      o = null;
    }
    return o;
  } else if (t === 'object') {
    for (i in data) {
      o[i] = deepClone(data[i]);
    }
    if (Object.keys(o).length === 0) {
      o = null;
    }
    return o;
  }
};

/**
 * 随机颜色
 */
export function randomColor() {
  let str = "#";
  for (let i = 0; i < 3; i++) {
    str += Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
  }
  return str;
}

/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close;
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;

  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object;
    var t2 = obj2[attr] instanceof Object;

    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + ' grayMode';
  } else {
    document.body.className = document.body.className.replace(' grayMode', '');
  }
};

/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 * @param word
 * @returns {*}
 */
export const encrypt = (word) => {
  var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * 解密
 * @param word
 * @returns {*}
 */
export const decrypt = (word) => {
  var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

/**
 * 动态插入css
 */
export const loadStyle = url => {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  const head = document.getElementsByTagName('head')[0];

  head.appendChild(link);
};
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.getElementById('page').className = name
  document.body.className = name;
};

/**
 *加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key
  } = params;
  const result = JSON.parse(JSON.stringify(data));

  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach(ele => {
      var data = result[ele];

      key = CryptoJS.enc.Latin1.parse(key);
      var iv = key;
      // 加密
      var encrypted = CryptoJS.AES.encrypt(
        data,
        key, {
          'iv': iv,
          'mode': CryptoJS.mode.CBC,
          'padding': CryptoJS.pad.ZeroPadding
        });

      result[ele] = encrypted.toString();
    });
  }
  return result;
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback();
  }
  document.addEventListener('fullscreenchange', function () {
    listen();
  });
  document.addEventListener('mozfullscreenchange', function () {
    listen();
  });
  document.addEventListener('webkitfullscreenchange', function () {
    listen();
  });
  document.addEventListener('msfullscreenchange', function () {
    listen();
  });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i];
        } else if (menu[i].children[j].children.length != 0) {
          return findParent(menu[i].children[j].children, id);
        }
      }
    }
  }
};

/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
  let result = true;

  Object.keys(a).forEach(ele => {
    const type = typeof a[ele];

    if (type === 'string' && a[ele] !== b[ele]) {
      result = false;
    } else if (type === 'object' && JSON.stringify(a[ele]) !== JSON.stringify(b[ele])) {
      result = false;
    }
  });
  return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i;
    }
  }
  return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = '';

  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4);
  if (date) {
    random = random + Date.now();
  }
  return random;
};


/**
 * 日期格式化
 */
export const dateFormat = (date) => {
  let format = 'YYYY-MM-DD HH:mm:ss';

  if (date != 'Invalid Date') {
    var o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds() // millisecond
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1,
        (String(date.getFullYear())).substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
          ('00' + o[k]).substr((String(o[k])).length));
      }
    }
    return format;
  }
  return '';
}

/**
 * 转换后台传入的带T的时间格式
 * @param {String} date 2019-04-24T02:30:00.000+0000
 */
export const resolvingDate = (date) => {
  //date是传入的时间
  let d = new Date(date);

  let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

  let times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;

  return times
}
