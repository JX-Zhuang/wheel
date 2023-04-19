const updateParamNameVisitor = {
    Identifier(path) {
        if(path.node.name === this.opts.source){
            path.node.name = this.opts.target;
        }
    }
}
const N2X = {
    visitor: {
        FunctionDeclaration(path) {
            const { opts } = this;
            const { node } = path;
            //递归遍历子节点
            path.traverse(updateParamNameVisitor, {opts});
        }
    }
};
module.exports = N2X;