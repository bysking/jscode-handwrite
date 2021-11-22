/**
 * 异步控制并发请求数量
 */

// 处理单个请求的包装函数返回promise
async function handleItem(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(item);
    }, 1000);
  });
}

let list = Array(20)
  .fill(1)
  .map((item, index) => index);

let resList = [];
function pp(list, limit, cb) {
  // 根据并发数截取请求列表
  let afterList = list.slice(limit);
  list = list.slice(0, limit);

  // 包装promise
  let promiseList = list.map((i) => handleItem(i));

  Promise.all(promiseList).then((rr) => {
    // 收集结果
    resList.push(...rr);

    // 处理过程中状态判断打印
    if (afterList.length) {
      cb(rr, "loading");
    } else {
      cb(rr, "done");
    }

    // 列表未处理完继续递归
    if (afterList.length) {
      pp(afterList, limit, cb);
    }
  });
}

let cb = (res, done) => console.log(res, done);
pp(list, 5, cb);
