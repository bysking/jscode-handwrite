function deepClone(obj, map = new WeakMap()) {
  if (obj == null || typeof obj !== "object") return obj; // 处理原始类型

  /**
   * 这一部分处理原生的一些日期，正则等对象类型
   */
  if (obj instanceof RegExp) return new RegExp(obj); // 处理特殊对象类型
  if (obj instanceof Date) return new Date(obj); // 处理特殊对象类型

  // 检查缓存
  if (map.has(obj)) {
    return map.get(obj);
  }

  // 统一处理了 {} 和 [] 两种类型的实例化
  let target = new obj.constructor();

  map.set(obj, target); // 设置缓存

  Object.keys(obj).forEach((key) => {
    target[key] = deepClone(obj[key], map);
  });

  return target;
}

//测试用例
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  d: {},
  e: /^\s|[0-9]+$/g,
};
obj.d = obj;

console.log(obj);
let clone_obj = deepClone(obj);
console.log(clone_obj);
