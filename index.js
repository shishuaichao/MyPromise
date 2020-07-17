
let MyPromise = require('./myPromise.js')

let promise = new MyPromise((resolve, reject) => {
        // resolve('成功')
        reject('失败')
    
})

promise.then(resolve => {
    console.log(resolve)
}, reason => {
    console.log(reason)
})