#!/usr/bin/env node //#!/usr/bin/env node
const { Command } = require("commander")
const {onCreate} = require("./create")//我们执行命令后需要回调的事件
//创建命令对象
const program = new Command()

//注册命令、参数、回调
//注册create命令
program.command('create')
    //添加命令描述
    .description('创建一个模块文件')
    // 添加命令参数 -t | --type <type> ，<type> 表示该参数必填，[type] 表示选填
    .option('-t --type <type>',`创建类型，可选值：model, router, service, middleware, controller`)
    // 注册命令回调
    .action(onCreate)//回调事件

// 执行命令行参数解析
program.parse()
//npm run cli -- -t all
