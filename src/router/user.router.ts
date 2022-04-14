const Router = require('@koa/router');
const {userRegister,userLogin,getInfo} = require('../controller/user.controller')
// @ts-ignore
const {verifyLogin} = require('../middleware/user.middleware')
// @ts-ignore
const {auth} = require("../middleware/auth.middleware");
const router = new Router({prefix:'/user'})//配置接口统一模块路径
router.get('/add',(ctx: { body: string; }, next: any) => {
    ctx.body = "路由配置成功了"
})
router.post('/register',userRegister)
router.post('/login',verifyLogin,userLogin)
router.get('/getInfo',auth,getInfo)//token验证中间件，获取个人信息控制器
module.exports = router
