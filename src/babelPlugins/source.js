/**
 * 箭头函数转换成普通函数
 */
const transformEs2015ArrowFunctions = function () {
    const arrowFunctionReturn = (a, b) => a + b;
    const arrowFunctionBodyReturn = (a, b) => {
        return a + b;
    };
    //处理this
    const arrowFunctionWithThis = () => {
        return this.a + this.b;
    };
    //callback
    setTimeout(() => a + b);
    setTimeout(() => {
        return a + b;
    });
    const functionReturnArrow = () => (a, b) => a + b;
}