/**
 * Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，
 * 通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。
 * 
 * 一切文件：JavaScript、CSS、SCSS、图片、模版，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的
 * 描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。经过  Webpack 的处理，最终会输出
 * 浏览器能使用的静态资源。
 */

/**
 * 3.1 安装 Webpack
 * 在使用 Webpack 执行构建任务时，需要通过 Webpack 可执行文件去启动构建任务，所以需要安装 Webpack 可执行文件
 */

/**
 * 3.1.1 安装 Webpack 到本地项目
 * 
 * # 安装最新稳定版
 * npm i -D webpack
 * 
 * # 安装指定版本
 * npm i -D webpack@<version>
 * 
 * # 安装最新体验版本
 * npm i -D webpack@beta
 * 
 * npm i -D 是 npm install --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies
 */

/**
 * 3.1.2 安装 Webpack 到全局
 * 安装到全局后你可以在任何地方公用一个Webpack可执行文件，而不用各个项目重复安装
 * npm i -g webpack
 * 
 * 推荐安装到当前项目，原因是可防止不同项目依赖不同版本的 Webpack 而导致冲突
 */

/**
 * 3.1.3 使用 Webpack
 */
(function(modules){
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;
    }
    return require("./index.js");
})({
    "./index.js": (function (module, exports, require) {
        eval("console.log('hello');\n\n");
    })
});

/**
 * #! /usr/bin/env node
 */
const pathLib = require('path');
const fs = require('fs');
const ejs = require('ejs');
const cwd = process.cwd();

const { entry, output: { filename, path } } = require(pathLib.join(cwd, './webpack.config.js'));
const script = fs.readFileSync(entry, 'utf8');
const bundle = `
    (function(modules){
        function require(moduleId) {
            var module = {
                exports: {}
            }
            modules[moduleId].call(module.exports, module, module.exports, require);
        }
        return require("<%-entry%>");
    })({
        "<%-entry%>":
            (function(module, exports, require) {
                eval("<%-script%>");
            })
    });
`
const bundlejs = ejs.render(bundle, {
    entry,
    script
});
try {
    fs.writeFileSync(pathLib.join(path, filename), bundlejs);
} catch (e) {
    console.error('编译失败', e);
}
console.log('compile successfully!');

/**
 * 3.1.4 依赖其他模块
 * #! /usr/bin/env node
 */
const pathLib = require('path');
const fs = require('fs');
const cwd = process.cwd();

const { entry, output: { path, filename } } = require(pathLib.join(cwd, './webpack.config.js'));
const script = fs.readFileSync(entry, 'utf8');
let modules = [];
script.replace(/require\(['"](.+?)['"]\)/g, function(){
    let name = arguments[1];
    let script = fs.readFileSync(name, 'utf8');
    modules.push({
        name,
        script
    });
});
const bundle = `
    (function(modules){
        function require(moduleId) {
            var module = {
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, require);
            return module.exports;
        }
        return require("<%-entry%>");
    })({
        "<%-entry%>":
            (function(module, exports, require){
                eval(\`<%-script%>\`);
            })
        <%if(modules.length>0){%>,<%}%>
        <%for(let i=0;i<modules.length;i++){
            let module = modules[i];%>
            "<%-module.name%>":
                (function(module, exports, require){
                    eval(\`<%-module.script%>\`);
                })
        <%}%>
    });
`
const bundlejs = ejs.render(bundle, {
    entry,
    script
});

try {
    fs.writeFileSync(pathLib.join(path, filename), bundlejs);
} catch (e) {
    console.error('编译失败', e);
}
console.log('compile successfully!');