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
