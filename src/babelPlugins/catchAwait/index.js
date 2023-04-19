/**
 * 给所有await加上try catch
 */
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { TryStatement, BlockStatement, CatchClause, Identifier } = require('@babel/types');
const { transformFromAstSync } = require('@babel/core');
const fs = require('fs');
const code = fs.readFileSync('./source.js', {
    encoding: 'utf8'
});
const ast = parse(code);
traverse(ast, {
    VariableDeclaration(path) {
        //把const、let变成var
        path.node.kind = 'var';
    },
    ArrowFunctionExpression(path) {
        const { node } = path;
        console.log(path.parentPath.type);
        node.type = 'FunctionExpression';
    },
    Program(path) {
        const tryCatch = TryStatement(BlockStatement([]),
            CatchClause(Identifier('e'), BlockStatement([]))
        );
    },
    // BlockStatement(path) {
    //     const { node } = path;
    //     const tryCatch = TryStatement(BlockStatement(node.body),
    //         CatchClause(Identifier('e'), BlockStatement([]))
    //     );
    //     node.body = [tryCatch];
    //     path.skip();    //to skip traversing the children of the current path
    // },
    AwaitExpression(path) {
        // console.log(path.parentPath.parentPath.type);
    }
});
const { code: newCode } = transformFromAstSync(
    ast,
    code,
    {}
);
console.log(newCode);