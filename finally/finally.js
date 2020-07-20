let promise = new Promise((r, j) => {
    // setTimeout(() => {
    //     // r('成功返回值')
    //     j('失败返回值')
    // }, 2000);

    r(2)
})

// promise
// .finally((e) => {
//     console.log('完成了', e)
// })
// .then(v => {
//     console.log('v', v)
// }, r => {
//     console.log('r', r)
// })


promise
.then(() => {}, () => {})
.then(e => console.log(e))
// undefined

promise
.finally(() => {})
.then(e => console.log(e))
// 2