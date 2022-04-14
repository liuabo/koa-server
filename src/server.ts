// const Koa = require('koa')
// const app = new Koa();
const {PORT} = require('./config/config.dotenv.ts')//导入
const serverApp = require('./app/index')//导入app文件

serverApp.use((ctx: { body: string; },next: any) => {
    ctx.body = 'hello'
})


serverApp.listen(PORT,()=>{
    console.log(`启动的服务的端口是http://localhost:${PORT}`)
})