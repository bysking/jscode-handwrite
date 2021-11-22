/**
 * 本质是将一个参数很多的函数拆分成单一参数的很多函数
 */

const curry = (fn) => {
  let fnLength = fn.length; // 收集原始函数的参数数量
  let judeg = (...args) => {
    let argsLen = args.length;

    // 执行的时候判断参数是否达到原始函数要求
    if (argsLen >= fnLength) {
      // 满足则执行
      return fn(...args);
    } else {
      // 不满足则继续返回新函数收集参数直到满足
      return (...newArgs) => judeg(...args, ...newArgs);
    }
  };

  return judeg;
};

const sum = (a, b, c, d) => a + b + c + d;
const currySum = curry(sum);

let rr = currySum(1)(2)(3)(5);
console.log(rr);
