/**
 * 防抖： 延迟执行 快速点击，只在时间结束时触发一次
 * 节流： 相等时间间隔执行一次 类似水滴
 */

function debounce(founc, wait) {
  let timmer = null;

  return function () {
    // 捕获函数执行环境和参数
    let context = this;
    let args = [...arguments];

    // 每次点击都会计时
    if (timmer) {
      clearTimeout(timmer);
    }

    timmer = setTimeout(() => {
      founc.call(context, ...args);
    }, wait);
  };
}

// let founc = (index) => {
//   console.log(index);
// };

// fnDebounce = debounce(founc, 300);

// setInterval(() => {
//   fnDebounce(1);
// }, 400);

// --------------------------------
// 节流

function throttle(func, wait) {
  let preTime = Date.now(); // 保存一个初始时间

  return function () {
    let curTime = Date.now(); // 触发的时候，获取一次当前时间

    if (curTime - preTime > wait) {
      // 判断是否满足执行时间
      func.call(this, ...arguments); // 执行
      preTime = curTime; // 更新上一次执行时间
    }
  };
}

// 测试用例
let founc = (index) => {
  console.log(index);
};

fnDebounce = throttle(founc, 1000);

setInterval(() => {
  fnDebounce(1);
}, 100);
