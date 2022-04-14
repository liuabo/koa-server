const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const rootRouter = require('../router/index')//修改


app.use(koaBody())
app.use(rootRouter.routes()).use(rootRouter.allowedMethods())//allowedMethods koa-router的中间件，用于处理请求方式不同进行特殊处理;
app.on('message',(err: { code: any },ctx: { status: number; body: any }) =>{//新增
    let status = 500
    switch(err.code){//这里可以判断你传进来的错误码，相应的改变返回的状态码，可以更好的知道发生了什么类型的错误，这里是一个例子，具体可以根据你前后端自己协调
        case '10001':
            status = 400
            break
        case '10002':
            status = 200
            break
        case '10003':
            status = 401
            break
        case '10004':
            status = 200
            break
        case '10005':
            status = 200
            break

        default :
            status = 500
    }
    ctx.status = status
    ctx.body = err
})


module.exports = app//导出
