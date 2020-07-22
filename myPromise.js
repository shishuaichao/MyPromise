
/**
 * 步骤：
 * 1. 在实例化后会立即执行一个函数executor，这个函数接收两个参数，第一个是成功的回调函数，第二个是失败的回调函数
 * 2. 在实例中调用resolve函数传入参数，作为内部成功回调的参数
 * 3. 在实例中调用reject函数传入参数，作为内部失败回调的参数
 * 4. 在调用resolve后修改状态为fulfilled，调用reject后修改状态为rejected，状态修改后不能变化
 * 5. 在定义的then方法中判断状态，如果状态被修改为fulfilled则调用成功回到，如果状态被修改为rejected则调用失败回调
 * 6. 异步实现
 *    产生原因：在调用then的时候状态仍处于pending，尚未调用resolve或者reject，就无法拿到实例调用resolve传进来的参数
 *    解决办法：在pending状态时，把成功回调和失败回调存在变量中，外部调用resolve时，判断变量中是否有值，有值说明是异步，调用成功回调
 * 7. 链式调用
 *    1. then返回的是promise实例，才能继续调用then方法
 *    2. 成功或者失败回调应该是一个数组，而非一个普通变量，用来存储每一次的回调方法，然后才能依次调用
 * 8. 异步链式调用
 * 9. 增加了调用then中函数抛出错误的情况，抛出错误走下一个then的reject，并将错误传入
 * 10. catch() 方法返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。 (事实上, calling obj.catch(onRejected) 内部calls obj.then(undefined, onRejected)).
 * 11. all() 方法接收一个数组，成功返回一个按照数组传入顺序的返回数组，失败返回第一个失败的返回值
 * 12. finally() 方法接收回调，回调中不传参数只用来执行，它与Promise.resolve(3).then(() => {}, () => {}) 的区别在于,finally会把finally执行后的结果
 *     传给下一个.then()的resolve中或者reject中，而Promise.resolve(3).then(() => {}, () => {})或者Promise.reject(3).then(() => {}, () => {})
 *      的resolve结果均为undefined，示例代码中有
 * 13. race（）跟all方法一样，接收一个数组，但是这个是比赛谁先执行完，返回一个promise，存储第一个执行完的结果，成功或者失败。
 */

const PENDING = 'pendding';
const FULFILLED = 'fulfilled';
const FAILED = 'rejected';

class MyPromise {
    constructor(executor) {
        executor(this.resolve, this.reject)
    }
    status = PENDING;
    value = undefined;
    reason = undefined;
    successCallback = [];
    failCallback = [];
    allValue = [];
    finallyCallback = undefined;
    finallySuccess = undefined;
    finallyFail = undefined;
    raceCallback = undefined;
    resolve = resolve => {
        this.status = FULFILLED;
        this.value = resolve;
        // 要想实现链式调用，就把所有的then中的成功或失败回调存在一个数组中，每次调用后弹出
        while (this.successCallback.length) {
            this.successCallback.shift()()
        };
        if (this.finallyCallback) {
            this.finallyCallback()
            this.finallySuccess(this.value)
        }
    }
    reject = reason => {
        this.status = FAILED;
        this.reason = reason;
        while (this.failCallback.length) {
            this.failCallback.shift()()
        };
        if (this.finallyCallback) {
            this.finallyCallback()
            this.finallyFail(this.reason)
        }
    }
    then(successCallback, failCallback) {
        // 首先链式调用的前提是必须返回一个自身的promise
        // 如果回调返回结果不是一个promise，则调用这个promise中的resolve或者reject将返回结果传入
        // 如果回调中返回一个primise就调用这个promise中的then，然后把对一个的resolve或者reject传入返回的promise中
        // 这样即使上一个then不返回值，也就是返回的undefined也会执行，不会影响下一次then的调用
        return new MyPromise((resolve, reject) => {
            try {
                if (this.status === FULFILLED) {
                    let r = successCallback(this.value);
                    resolvePromise (r, resolve, reject)
                } else if (this.status === FAILED) {
                    let r = failCallback(this.reason);
                    resolvePromise (r, resolve, reject)
                } else if (this.status === PENDING) {
                    // 异步
                    this.successCallback.push(() => {
                        try {
                            let r = successCallback(this.value);
                            resolvePromise (r, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    });
                    this.failCallback.push(() => {
                        try {
                            let r = failCallback(this.reason);
                            resolvePromise (r, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    });
                }
            } catch (e) {
                reject(e)
            }
        })
    }
    catch(failCallback) {
        this.then(() => {}, failCallback)
    }
    
    static all (args) {
        if (!(args instanceof Array)) {
            // 不是一个数组
            throw(new SyntaxError('argument is not iterable'))
        }
        if (!args.length) {
            return new MyPromise((resolve, reject) => {
                resolve()
            })
        } else {
            // 假设都是promise 返回一个promise
            let num = 0;
            let arr = [];
            return new MyPromise((resolve, reject) => {
                function addData(i, value) {
                    arr[i] = value;
                    num++
                    if (num === args.length) {
                        resolve(arr)
                    }
                }
                for (let i=0; i<args.length; i++) {
                    if (args[i] instanceof MyPromise) {
                        // 传入的是primise，通过调用then来拿到传入promise的返回值，进行操作
                        args[i].then(value => {
                            addData(i, value)
                        }, reason => {
                            reject(reason)
                        })
                    } else {
                        // 传入的是普通值，直接放入数组指定位置
                        addData(i, args[i]);
                    }
                }
            })
            
            
        }
        
    }
    static race (args) {
        let arr = [];
        let num = 0;
        return new MyPromise((resolve, reject) => {
            function addData (i, value) {
                arr[i] = value;
                num++;
                if (num === 1) {
                    resolve(value)
                }
            }
            for (let i=0; i<args.length; i++) {
                if (args[i] instanceof MyPromise) {
                    args[i].then(value => {
                        addData(i, value);
                    }, reason => {
                        reject(reason)
                    })
                } else {
                    addData(i, args[i])
                }
            }
        })
    }
    static resolve = (value) => {
        return new MyPromise((r, j) => {
            r(value)
        })
    }
    static reject = (reason) => {
        return new MyPromise((r, j) => {
            j(reason)
        })
    }

    finally (cb) {
        return new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                cb()
                resolve(this.value)
            } else if (this.status === FAILED){
                cb()
                reject(this.reason)
            } else {
                this.finallyCallback = cb;
                this.finallySuccess = resolve;
                this.finallyFail = reject;
            }
        })
    }
}


function resolvePromise (r, resolve, reject) {
    if (r instanceof MyPromise) {
        r.then(resolve, reject)
    } else {
        resolve(r)
    }
}


module.exports = MyPromise