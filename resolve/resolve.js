let MyPromise = require('../myPromise')

// MyPromise.resolve(123)
// .then(e => {
//     console.log('xxx', e)
// })

MyPromise.reject(123)
.catch(e => {
    console.log('xxx', e)
})