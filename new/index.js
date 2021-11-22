/**
 * new 做了什么事情
 * 1.创建新对象
 * 2.修改新对象原型指向构造函数原型
 * 3.新对象作为构造函数中this，执行构造函数
 * 4.根据构造函数返回值类型，判断是否返回新对象或者返回构造函数返回的对象值
 */

function myNew() {
  let obj = new Object();

  // 获取构造函数
  let myConstructor = arguments[0];

  // 实现新对象继承
  obj.__proto__ = myConstructor.prototype;

  // 调用构造器
  let res = myConstructor.apply(obj, [...arguments].slice(1));

  // 构造器返回值如果是对象，就作为new的返回值，否则返回新的实例
  return typeof res === "object" && res !== null ? res : obj;
}

const testNew = function (name) {
  this.name = name;

  return {};
};

let rr = myNew(testNew, "小红");

console.log(rr);
console.log(rr instanceof testNew);
