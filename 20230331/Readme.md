## 1.REPL

在 Node.js 中为了使开发者方便测试 JavaScript 代码，提供了一个名为 REPL 的可交互式运行环境。开发者可以在该运行环境中输入任何 JavaScript 表达式，当用户按下回车键后，REPL 运行环境将显示该表达式的运行结果。

## 2.如何进入 REPL

在命令行容器中输入 node 命令并按下回车键，即可进入 REPL 运行环境。

## 3.REPL 操作

- 变量的操作，声明普通变量和对象
- eval
- 函数的书写
- 下划线访问最近使用的表达式
- 多行书写
- REPL 运行环境中的上下文对象

```js
const repl = require("repl");
const con = repl.start().context;
con.msg = "hello";
con.hello = function () {
  console.log(con.msg);
};
```

## 4.REPL 运行环境的基础命令

- .break 退出当前命令
- .clear 清除 REPL 运行环境上下文对象中保存的所有变量与函数
- .exit 退出 REPL 运行环境
- .save 把输入的所有表达式保存到一个文件中
- .load 把所有的表达式加载到 REPL 运行环境中
- .help 查看帮助命令
