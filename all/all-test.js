

Promise
.all(['a', 'b', fn1(), fn2(), 'c'])
.then(value => {
    console.log(value)
}, reason => {
    console.log(reason)
})

function fn1 () {
    return new Promise((r, j) => {
        setTimeout(() => {
            r('fn1')
        }, 1000);
    })
}
function fn2 () {
    return new Promise((r, j) => {
        setTimeout(() => {
            r('fn2')
        }, 2000);
    })
}
function fn3 () {
    return new Promise((r, j) => {
        setTimeout(() => {
            r('fn3')
        }, 3000);
    })
}