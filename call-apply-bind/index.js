/**
 * call的目的是修改函数内部this指向，每个函数都有call需要结合Function.prototype
 * 捕获当前函数，放在目标对象身上执行，再删除
 */

Function.prototype.mycall = function (targetObj) {
  let that = this; // 捕获当前函数

  // 防止内置临时属性名字冲突
  let fn = Symbol("fn");

  // 参数处理
  const args = [...arguments].slice(1);
  targetObj = targetObj || global; // 默认window

  targetObj[fn] = that; // 函数挂在目标对象上

  let res = targetObj[fn](...args); // 执行

  delete targetObj[fn]; // 清除临时变量

  return res; // 返回执行结果
};

// 测试用例
let obj = {
  name: "bysking",
};

function testCall(a, b) {
  console.log(this.name, a, b);
}

testCall.mycall(obj, 444, 555); // => bysking

// --------------------------------

// 实现apply
Function.prototype.myApply = function (targetObj) {
  let that = this;
  let fn = Symbol("fn");

  const args = arguments[1]; // 只有参数这里不一样，apply接受一个参数列数组形式

  targetObj = targetObj || global;
  targetObj[fn] = that;
  let res = targetObj[fn](...args);
  delete targetObj[fn];
  return res;
};

// apply 测试用例
let obj2 = {
  name: "bysking",
};

function testCall(a, b) {
  console.log(this.name, a, b);
}

testCall.myApply(obj2, [444, 555]); // => bysking

// ----------------------------------

/**
 * bind函数
 */
Function.prototype.myBind = function (targetObj) {
  let that = this;

  let originArgs = [...arguments].slice(1);

  let nop = function () {}; // 因为要返回一个新函数，所以要保留原函数的原型构造一个干净函数用于保存原函数的原型

  let bound = function () {
    // 判断返回的bind函数是不是通过new 调用 ？ 是：this指向的就是其实例；否：this指向targetObj

    targetObj = this instanceof nop ? this : targetObj;

    return that.apply(targetObj, [...originArgs, ...arguments]);
  };

  // 判断是为了解决箭头函数没有原型
  if (that.prototype) {
    nop.prototype = that.prototype;
  }

  // 继承原型
  bound.prototype = new nop();

  return bound;
};

const bar = function () {
  console.log(this.name, arguments);
};

bar.prototype.name = "bysking";

const foo = {
  name: "小明",
};

const bindFn = bar.myBind(foo, 22, 33, 44);
bindFn(55);

new bindFn();
