
let MyPromise = require('./myPromise.js')

let promise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            // resolve('成功')
            reject('失败')
        }, 1000);
    
})

promise.then(resolve => {
    console.log(resolve)
}, reason => {
    console.log(reason)
})