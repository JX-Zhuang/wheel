const t = require('@babel/types');
let ArrowFunctionsPlugin = {
    name: "transform-arrow-functions",
    // 每个插件都有自己的访问器
    visitor: {
        // 处理所有箭头函数节点, ArrowFunctionExpression其实就是AST语法树中的节点的type

        ArrowFunctionExpression(path) { // 参数是节点所在的路径
            const { node } = path;
            hoistFunctionEnvironment(path);
            arrowReturn(node);
            node.type = 'FunctionExpression' // 类型变成普通函数，这样箭头函数就变成了普通函数
        }
        // ArrowFunctionExpression: {
        //     enter() {
        //         console.log("Entered!");
        //     },
        //     exit() {
        //         console.log("Exited!");
        //     }
        // }
    }
};
const hoistFunctionEnvironment = (path) => {
    const thisEnv = path.findParent(p => {
        return p.isFunctionExpression() || p.isProgram();
    });
    const thisPaths = getScopeInfoInformation(path);
    if (thisPaths.length > 0) {
        const thisBind = path.scope.generateUidIdentifier('_this');
        thisPaths.forEach(thisPath => {
            thisPath.replaceWith(thisBind);
        });
    }
};
const getScopeInfoInformation = (path) => {
    const thisPaths = [];
    path.traverse({
        ThisExpression(thisPath) {
            thisPaths.push(thisPath);
        }
    });
    return thisPaths;
};
const arrowReturn = (node) => {
    //如果箭头函数直接返回
    if (node.body.type === 'BinaryExpression' || node.body.type === 'ArrowFunctionExpression') {
        node.body = t.blockStatement([t.returnStatement(node.body)]);
    }
};
module.exports = ArrowFunctionsPlugin;