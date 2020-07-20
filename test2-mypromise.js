let MyPromise = require('./myPromise')

let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('xxx')
        // resolve('xxxx')
    }, 1000);
})


promise
.catch(e => {console.log('catch', e)})
.then(fn1, fn2)
.catch(e => {console.log('catch2', e)})
.then(fn3, fn4) 
.then(fn5, fn6)

function fn1(res) {
    console.log('fn1', res)
    return new MyPromise((r, j) => {
        setTimeout(() => {
            j('fn1返回的值')
            // throw('xxx')
        }, 1000);
    })
    // return 'fn1返回的值';
}

function fn2(res) {
    console.log('fn2', res)
    return new MyPromise((r, j) => {
        setTimeout(() => {
            j('fn2返回的值')
        }, 1000);
    })
}

function fn3(res) {
    console.log('fn3', res)
    return new MyPromise((r, j) => {
        setTimeout(() => {
            r('fn3返回的值')        // 注释掉这一行看看效果有什么不一样
        }, 1000);
    })
    // return 'fn3返回的值 '
}

function fn4(res) {
    console.log('fn4', res)
    return new MyPromise((r, j) => {
        setTimeout(() => {
            j('fn4返回的值')
        }, 1000);
    })
}

function fn5(res) {
    console.log('fn5', res)
}

function fn6(res) {
    console.log('fn6', res)
}