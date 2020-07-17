
/**
 * 步骤：
 * 1. 在实例化后会立即执行一个函数executor，这个函数接收两个参数，第一个是成功的回调函数，第二个是失败的回调函数
 * 2. 在实例中调用resolve函数传入参数，作为内部成功回调的参数
 * 3. 在实例中调用reject函数传入参数，作为内部失败回调的参数
 * 4. 在调用resolve后修改状态为fulfilled，调用reject后修改状态为rejected，状态修改后不能变化
 * 5. 在定义的then方法中判断状态，如果状态被修改为fulfilled则调用成功回到，如果状态被修改为rejected则调用失败回调
 * 6. 异步。。。待定
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
    resolve = resolve => {
        this.status = FULFILLED;
        this.value = resolve;
    }
    reject = reason => {
        this.status = FAILED;
        this.reason = reason;
    }
    then(successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback(this.value);
        } else if (this.status === FAILED) {
            failCallback(this.reason);
        }
    }
}

module.exports = MyPromise