
let MyPromise = require('./myPromise.js')
// 切换两个方法看效果是否一样

let promise = new MyPromise((resolve, reject) => {
        // setTimeout(() => {
            resolve('成功')
            // reject('失败')
        // }, 1000);
})

// let promise = new Promise((resolve, reject) => {
//         // setTimeout(() => {
//             resolve('成功')
//             // reject('失败')
//         // }, 1000);
// })

promise.then(resolve => {
    console.log(resolve)
    // return '第一次then'
}, reason => {
    console.log(reason)
    // return '第一次then'
})
.then(resolve => {
    console.log(resolve)
    return new MyPromise((res, rej) => {
        res('第二次then')
    })
}, reason => {
    console.log(reason)
    return new MyPromise((res, rej) => {
        rej('第二次then')
    })
})
.then(resolve => {
    console.log(resolve)
    return '第三次then'
}, reason => {
    console.log(reason)
    return '第三次then'
})


