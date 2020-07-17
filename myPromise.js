
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
 * 7. 链式调用。。。待定
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
    successCallback = undefined;
    failCallback = undefined;
    resolve = resolve => {
        this.status = FULFILLED;
        this.value = resolve;
        this.successCallback && this.successCallback(this.value);
    }
    reject = reason => {
        this.status = FAILED;
        this.reason = reason;
        this.failCallback && this.failCallback(this.reason);
        
    }
    then(successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback(this.value);
        } else if (this.status === FAILED) {
            failCallback(this.reason);
        } else {
            // 异步
            this.successCallback = successCallback;
            this.failCallback = failCallback;
        }
    }
}

module.exports = MyPromise