// module.exports = {
//     UserRegisterError:{
//         code:'10001',
//         message:'参数错误or其他错误',
//         result:''
//     },
//     userPasswordError: {
//         code:'10002',
//         message:'参数错误or其他错误',
//         result:''
//     },
//     TokenExpiredError: {
//         code:'10401',
//         message:'token过期,请重新登录',
//         result:''
//     },
//     UserLoginError:{
//         code:'10001',
//         message:'参数错误or其他错误',
//         result:''
//     },
// }

export default {
    UserRegisterError:{
        code:'10001',
        message:'参数错误or其他错误',
        result:''
    },
    UserPasswordError: {
        code:'10002',
        message:'密码错误',
        result:''
    },
    TokenExpiredError: {
        code:'10003',
        message:'token过期,请重新登录',
        result:''
    },
    UserLoginError:{
        code:'10004',
        message:'参数错误or其他错误',
        result:''
    },
    UserIsUndefined: {
        code:'10005',
        message:'用户不存在',
        result:''
    }
}