

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('xxx')
    }, 1000);
})


promise
.then(fn1, fn2)
.then(fn3, fn4)
.then(fn5, fn6)

function fn1(res) {
    console.log('fn1', res)
    return new Promise((r, j) => {
        setTimeout(() => {
            r('fn1返回的值')
        }, 1000);
    })
}

function fn2(res) {
    console.log('fn2', res)
}

function fn3(res) {
    console.log('fn3', res)
    return new Promise((r, j) => {
        setTimeout(() => {
            // r('fn3返回的值')
            // 注释掉这一行看看效果有什么不一样
        }, 1000);
    })
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