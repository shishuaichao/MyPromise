let MyPromise = require('./myPromise')

// let promise = new Promise((resolve, reject) => {
//     resolve('xxx')
// })
let promise = new MyPromise((resolve, reject) => {
    resolve('xxx')
})


promise
.then(fn1, fn2)
.then(fn3, fn4)
.then(fn5, fn6)

function fn1(res) {
    console.log('fn1', res)
    return 'fn1返回值'
}

function fn2(res) {
    console.log('fn2', res)
}

function fn3(res) {
    console.log('fn3', res)
    // 没有返回值，就是返回undefined
}

function fn4(res) {
    console.log('fn4', res)
}

function fn5(res) {
    console.log('fn5', res)
}

function fn6(res) {
    console.log('fn6', res)
}