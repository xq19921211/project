/**
 * Created by xu.long on 2018/5/18.
 */

import moment from 'moment';

export function clone(myObj) {
  if (myObj == null) return myObj;
  if (myObj.constructor === Array) {
    let myNewArray = new Array();
    for (let j in myObj) myNewArray.push(clone(myObj[j]));
    return myNewArray;
  } else if (myObj.constructor === Object) {
    let myNewObj = new Object();
    for (let i in myObj) myNewObj[i] = clone(myObj[i]);
    return myNewObj;
  } else {
    return myObj;
  }
}
export const urlGenerator = (url, obj) => {
  let resultUrl,
    count = 0;
  if (!obj) {
    resultUrl = url;
  } else {
    let ret = [];
    for (var key in obj) {
      count++;
      key = encodeURIComponent(key);
      var values = obj[key];
      if (values && values.constructor === Array) {
        //数组
        var queryValues = [];
        for (var i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(toQueryPair(key, value));
        }
      } else if (values) {
        ret.push(toQueryPair(key, values));
      }
    }
    if (count < 1) {
      resultUrl = url;
    } else {
      resultUrl = url + '?' + ret.join('&');
    }
  }
  return resultUrl;
};
function toQueryPair(key, value) {
  if (typeof value == 'undefined') {
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

/**
 * dateFormat(new Date(time), 'yyyy-MM-dd hh:mm:ss')
 * @param time
 * @param fmt
 * @returns {*}
 */
export const dateFormat = (time, fmt) => {
  if (!time) {
    return null;
  }
  var o = {
    'M+': time.getMonth() + 1, //月份
    'd+': time.getDate(), //日
    'h+': time.getHours(), //小时
    'm+': time.getMinutes(), //分
    's+': time.getSeconds(), //秒
    'q+': Math.floor((time.getMonth() + 3) / 3), //季度
    S: time.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (time.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
  return fmt;
};

export const isEmpty = v => {
  switch (typeof v) {
    case 'undefined':
      return true;
    case 'string':
      if (v.trim().length === 0 || v.trim() === '') return true;
      break;
    case 'boolean':
      if (!v) return true;
      break;
    case 'number':
      if (0 === v) return true;
      break;
    case 'object':
      if (null === v) {
        return true;
      } else if (Object.keys(v).length === 0) {
        return true;
      } else {
        return false;
      }
  }
  return false;
};

export const arrayDistinct = arr => {
  var result = [],
    i,
    j,
    len = arr.length;
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        j = ++i;
      }
    }
    result.push(arr[i]);
  }
  return result;
};
export const DEADLINE = '2018/07/31 23:59:59';
export function getCoutDown(start = moment(), target = DEADLINE) {
  start = moment(start);
  target = moment(target);
  const diff = moment.duration(target - start);
  const textArr = [
    { type: 'days', text: '天' },
    { type: 'hours', text: '时' },
    { type: 'minutes', text: '分' },
    { type: 'seconds', text: '秒' },
  ];
  return textArr
    .map(item => {
      return {
        ...item,
        number: diff.get(item.type),
      };
    })
    .reduce(
      (arr, next) =>
        next.number ? [...arr, `${next.number}${next.text}`] : arr,
      [],
    )
    .join('');
}
