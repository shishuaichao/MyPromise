var promise = new Promise((resolve, reject) => {
    
})

function fn1() {
    return new Promise((r, j) => {
        setTimeout(() => {
            j('fn1')
        }, 1000);
    })
}
function fn2() {
    return new Promise((r, j) => {
        setTimeout(() => {
            r('fn2')
        }, 2000);
    })
}
function fn3() {
    return new Promise((r, j) => {
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