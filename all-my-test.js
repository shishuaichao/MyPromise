let MyPromise = require('./myPromise')

function fn1 () {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            // reject('fn1')
            resolve('fn1')
        }, 1000)
    })
}
function fn2 () {
    return new MyPromise((resolve, reject) => {
        resolve('fn2')
    })
}


MyPromise
.all(['a', 'b', fn1(), fn2(), 'c'])
.then((e) => {
    console.log('res', e)
},(e) => {
    console.log('rej', e)
})

