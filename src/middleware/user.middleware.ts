// @ts-ignore
import userService from "../service/user.service";
import errModal from '../message/message';
const {getUserinfo} = userService;
const {UserPasswordError, UserIsUndefined, UserLoginError} = errModal;
// @ts-ignore
const verifyLogin = async (ctx: any, next: () => any) => {//验证密码中间件
  try {
    const {username,password} = ctx.request.body;
    const res = await getUserinfo({username});
    //用户不存在
    if(!res) {
      console.log('用户不存在',ctx.request.body)
      ctx.app.emit('message',UserIsUndefined,ctx)
      return
    }
    if (password!==res.password){
      ctx.app.emit('message',UserPasswordError,ctx)
      return
    }
  }catch (err) {
    console.error(err);
    ctx.app.emit('message',UserLoginError,ctx)
  }
  await next();//进入下一个中间件
}

module.exports= {
  verifyLogin
}
