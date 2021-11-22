/**
 * 实现对象响应式监听
 */

// defineProperty

let obj = {
  text: 123,
};

function reactive(obj) {
  Object.keys(obj).forEach((key) => {
    let vv = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        return vv;
      },
      set(val) {
        vv = val;
        console.log("set", vv);
      },
    });
  });
}

// reactive(obj);

// obj.text = 2222;
// console.log(obj.text);
// obj.text = 333;
// console.log(obj.text);

// proxy
function reactiveProxy(target) {
  return new Proxy(target, {
    get(obj, prop) {
      return obj[prop];
    },

    set(obj, prop, value) {
      obj[prop] = value;
    },
  });
}

let testObj = {
  name: 111,
};
let proxy = reactiveProxy(testObj);

console.log(proxy.name);
proxy.name = 888;
console.log(proxy.name);
