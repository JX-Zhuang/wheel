const t = require('@babel/types');
const testPlugin = function ({ types }) {
    return {
        pre() {
            this.cache = new Map();
        },
        post(state) {
            console.log(this.cache);
        },
        visitor: {
            StringLiteral(path) {
                // throw path.buildCodeFrameError("Error message here");
            },
            BinaryExpression(path, state) {
                if (path.node.operator === '-') {
                    // path.parentPath.remove();
                    path.node.operator = '+';
                    path.parentPath.replaceWith(
                        t.VariableDeclaration('var',
                            [t.VariableDeclarator(
                                t.Identifier('aaa'), path.node)]));
                    return;
                }
                if (path.node.operator !== '===') return;
                path.node.left = t.identifier('sebmck');
                path.node.right = t.identifier("dork");
            },
            // BinaryExpression(path) {
            //     path.replaceWith(
            //         t.binaryExpression("**", path.node.left, t.numberLiteral(2))
            //     );
            // }
            FunctionDeclaration(path) {
                if (path.scope.hasOwnBinding("n")) {
                    path.scope.rename("n");
                    return;
                }
                if (path.node.id.name.startsWith('remove')) {
                    path.remove();
                    return;
                }
                path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
                path.insertAfter(t.expressionStatement(t.stringLiteral("A little high, little low.")));
            },
            ClassMethod(path) {
                if (!t.isClassMethod(path.node, { kind: 'constructor' })) return;
                path.get('body').unshiftContainer('body', t.expressionStatement(t.stringLiteral('before')));
                path.get('body').pushContainer('body', t.expressionStatement(t.stringLiteral('after')));
            }
        }
    };
};
module.exports = testPlugin;