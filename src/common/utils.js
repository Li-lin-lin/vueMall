export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

export function debounce(func, delay) {
  let timer = null
  // 返回一个函数
  return function (...args) {
    clearTimeout(timer)
    // 如果重复请求时间快于delay的话重置定时器 直到最后一次请求
    timer = setTimeout(() => {
/**
 * func.apply(this, arguments), 这样一来，就可以对 debounce 返回的那个函数传递参数，func 执行的时候，再把参数传给 func.
 */
      func.apply(this, args)
    }, delay)
  }
}
