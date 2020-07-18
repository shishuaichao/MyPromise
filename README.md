

### 分析Promise运行过程

```js
1. 实例化
let promise = new Promise((resolve, reject) => {
    ...
    resolve('xxx')
    or
    reject('xxx')
})

2. 调用
promise.then(fn1, fn2)


// 此时实例化中的resolve调用的就是fn1,reject调用的就是fn2
// 所以如果在实例化时不调用resolve，则fn1永远不会执行，fn2同理


3. 链式调用
promise
    .then(fn1, fn2)
    .then(fn3, fn4)
    .then(fn5, fn5)

fn1,fn3,fn5会执行
fn1中参数是实例化调用的resolve传的值
fn3参数是执行fn1中的返回值
fn5参数是执行fn3中的返回值
// test1.js
。。。
当然上述指的是fn1和fn3中返回的都是普通值或者undefined
如果fn1中返回的是Promise实例，假设叫A，则fn3中的参数是实例A中调用resolve传入的参数
。。。
// 这是在手写promise链式调用中需要注意的，
// 一定要判断上一个then中resolve调用后，
// 返回的是普通值（包括undefined）还是一个promise实例，
// 当然不管是返回的普通值，还是一个promise实例，都需要包裹在一个新的promise，例如B中，在执行完then后返回这个新的promise B，使得可以继续then下去
// 但是，区别就在于，假设下一个then是C，这个为C的then中，resolve或者reject能不能执行的问题
// 如果上一个then的resolve中返回的是一个普通值r，那么在手写pormise的时候就可以直接调用新的promise B中的resolve方法，将返回值r作为参数传递下去，供下一个then中的resolve使用，即调用resolve（r）
// 如果上一个then中的resolve中返回的是一个promise实例，那么在手写promise的时候就需要调用这个实例中 D的then方法，并使用新包装的promise B中的resolve充当实例中 D中的resolve来拿到实例 D中resolve的入参，因为这个入参才是上一个then中调用resolve的真正返回值，
** 上面的一句话有点绕，说白了上一个then中resolve中返回的promise实例中的resolve函数，就是下一个then中的resolve函数，前者是调用，后者是定义
用test2-mypormise.js或者test2-pormise.js中例子解释就是：
fn1函数返回的promise实例中的r函数，就是fn3，前者r函数是调用，后者fn3是定义
// 如果上一个then的resolve函数中返回的promise实例没有调用resolve函数，则下一个then中的promise永远不会触发
// reject跟resolve同理



```