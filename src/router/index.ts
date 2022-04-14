const fs = require('fs')//node.js文件处理模块
const appRouter = require('@koa/router')
const approuter = new appRouter({prefix:'/api'}); // 配置接口统一模块路径

//自动引入router
fs.readdirSync(__dirname).forEach((file: string) => {
    if (file !== 'index.ts') {
        let r = require('./' + file)
        approuter.use(r.routes())
    }
})

module.exports = approuter
