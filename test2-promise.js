

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('xxx')
        reject('xxx')
        // throw(new Error('xxx'))
    }, 1000);
})


promise
.catch(e => {
    console.log('catch', e)
})
.then(fn1, fn2)
.then(fn3, fn4)
.then(fn5, fn6)


function fn1(res) {
    console.log('fn1', res)
    return new Promise((r, j) => {
        setTimeout(() => {
            r('fn1返回的值')
            // throw(new Error('xxx'))
        }, 1000);
    })
    // return Promise.resolve('fn1 return ') 
    // return 'fn1 return '
    // throw(new Error('xxx'))
}

function fn2(res) {
    console.log('fn2', res)
    return 'fn2 return'             // 走fn3
    // throw(new Error('fn2 error'))   // 走fn4
    // return new Promise((r, j) => {
    //     j('fn2 reject')
    // })

}

function fn3(res) {
    console.log('fn3', res)
    return new Promise((r, j) => {
        setTimeout(() => {
            r('fn3返回的值')
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