
let MyPromise = require('../myPromise')

function fn1() {
    return new MyPromise((r, j) => {
        setTimeout(() => {
            r('fn1')
        }, 1000);
    })
}
function fn2() {
    return new MyPromise((r, j) => {
        // setTimeout(() => {
            j('fn2')
        // }, 2000);
    })
}
function fn3() {
    return new MyPromise((r, j) => {
        setTimeout(() => {
            r('fn3')
        }, 3000);
    })
}


Promise.race([fn1(), fn2(), fn3()])
.then((e) => {
    console.log(e)
}, e => {
    console.log(e)
})