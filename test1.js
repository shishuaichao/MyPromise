let MyPromise = require('./myPromise')

// let promise = new Promise((resolve, reject) => {
//     resolve('xxx')
// })
let promise = new Promise((resolve, reject) => {
    resolve('xxx')
    // reject('reject')
    // throw('error')
})


promise
.then(fn1, fn2)
.catch(e => {console.log(e, '第一个catch')})
.then(fn3, fn4)
.catch(e => {console.log(e, '第二个catch')})
.then(fn5, fn6)

function fn1(res) {
    console.log('fn1', res)
    throw('fn1 error')
    // return 'fn1返回值'
}

function fn2(res) {
    console.log('fn2', res)
    return new Promise((r, j) => {
        j('fn2 error')
    })
}

function fn3(res) {
    console.log('fn3', res)
    // 没有返回值，就是返回undefined
    throw('fn3 error')
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