const PENDING = "pending"; // 初始状态
const FULLFILED = "fullfiled"; // 完成态
const REJECT = "reject"; // 拒绝状态

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = "";
    this.reason = "";

    // 处理异步
    this.onfullfiledArrCb = [];
    this.onrejectedArrCb = [];

    // resolve方法
    let resolve = (data) => {
      if (this.status === PENDING) {
        this.status = FULLFILED;
        this.value = data;

        this.onfullfiledArrCb.forEach((f) => {
          f();
        });
      }
    };

    // reject方法
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECT;
        this.reason = reason;

        this.onrejectedArrCb.forEach((f) => {
          f();
        });
      }
    };

    try {
      executor(resolve, reject); // 立即执行
    } catch (err) {
      reject(err);
    }
  }

  then(onfullfiled, onrejected) {
    let pp = new MyPromise((resolve, reject) => {
      if (this.status === FULLFILED) {
        let x = onfullfiled(this.value);
        resolve(x);
      }

      if (this.status === REJECT) {
        let y = onrejected(this.reason);
        reject(y);
      }

      if (this.status === PENDING) {
        let ff = () => {
          let x = onfullfiled(this.value);
          resolve(x);
        };
        this.onfullfiledArrCb.push(ff);

        let rr = () => {
          let y = onrejected(this.reason);
          reject(y);
        };
        this.onrejectedArrCb.push(rr);
      }
    });

    return pp;
  }
}

let p = new MyPromise((resolve, reject) => {
  //   throw new Error("测试报错");
  //   resolve("ok");
  //   reject("失败状态");

  setTimeout(() => {
    resolve("ok");
  }, 1000);
});

p.then(
  (data) => {
    console.log("成功", data);
    return "666链式调用";
  },
  (err) => {
    console.log("失败", err);
  }
).then((data) => {
  console.log("第二层", data);
});

console.log(p);
