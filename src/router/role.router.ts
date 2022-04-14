const roleRouter = require('@koa/router');
const rolerouter = new roleRouter({prefix:'/role'})//配置接口统一模块路径
rolerouter.get('/add',(ctx: { body: string; },next: any) => {
    ctx.body = "路由自动引入成功了"
})
module.exports = rolerouter
