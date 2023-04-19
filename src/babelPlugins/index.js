const babelCore = require('@babel/core')
const ArrowFunctionsPlugin = require('./transform-arrow-functions');
const TestPlugin = require('./test');
const N2X = require('./n-to-x');
const fs = require('fs');
const sourceCode = fs.readFileSync('./source.js', {
    encoding: 'utf8'
});
const targetCode = babelCore.transform(sourceCode, {
    // presets: ["@babel/preset-env"], // 可以写成这种预设，也可以写成下面的插件数组，预设是插件的集合
    // plugins: [[N2X, {
    //     source: 'n',
    //     target: 'x'
    // }]]
    // plugins: [[TestPlugin, {
    //     a: 1
    // }]],
    plugins: [ArrowFunctionsPlugin]
})
console.log(targetCode.code)
