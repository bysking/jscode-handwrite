/**
 * 向上查找左边的原型链和右边的原型比较
 * L.__proto__ === R.prototype;
 * L.__proto__.__proto__ === R.prototype;
 * ...
 * 直到L.__proto__.xxx.__proto__ === null 都不满足和 R.prototype 相等
 */

function myInstanceOf(L, R) {
  while (L.__proto__) {
    if (L.__proto__ === R.prototype) {
      return true;
    }
    L = L.__proto__;
  }

  return false;
}

let a = myInstanceOf(Array, Array);
console.log(a);
