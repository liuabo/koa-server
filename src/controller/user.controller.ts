import errModal from '../message/message'
const {UserPasswordError,UserRegisterError} = errModal
import UserService from '../service/user.service'
const {createUser,getUserinfo} = UserService
/**
 * 生成token
 * 接收三个参数：
 * 第一个是载荷，用于编码后存储在 token 中的数据，也是验证 token 后可以拿到的数据；
 * 第二个是密钥，自己定义的，验证的时候也是要相同的密钥才能解码；
 * 第三个是options，可以设置 token 的过期时间。例如： { expiresIn: '2h'}、{ expiresIn: '1day' },
 * **/
// @ts-ignore
const jwt = require('jsonwebtoken')//引入jwt

class UserController {
    async userRegister(ctx: { request: { body: { username: any; password: any; }; }; body: { code: number; message: string; result: any; }; app: { emit: (arg0: string, arg1: any, arg2: any) => void; }; }, next: any) {
        try {
            const {username,password} = ctx.request.body
            const res = await createUser(username,password)
            ctx.body={
                code:0,
                message:"注册成功",
                result:res
            }
        }catch (err) {
            console.log(err)
            ctx.app.emit('message',UserRegisterError,ctx)
        }
    }
    async userLogin(ctx:any, next: any) {
        try{
            const {username} = ctx.request.body;
            const {password,...res} = await getUserinfo({username})//把密码排除掉不返回
            ctx.body = {
                code:0,
                message:"登录成功",
                result:{
                    sessionKey:jwt.sign(res,'fjhtglxt',{expiresIn:'24h'}),

                }
            }
        }catch (err) {
            ctx.app.emit('message',UserPasswordError,ctx)
        }
    }
    async getInfo(ctx: { state: { user: { id: any; }; }; body: { code: number; message: string; result: any; }; }, next: any) {
        try {
            const {id} = ctx.state.user;//因为token里面加入了我们的个人信息所以我们可以解构出我们的id
            const res = await getUserinfo({id})
            ctx.body = {
                code:0,
                message:'查询成功',
                result:res
            }
        }catch (err) {
            console.log(err)
        }
    }

}
module.exports = new UserController()
