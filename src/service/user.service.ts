// @ts-ignore
const User = require('../model/user.model')

class UserService{
    async createUser(username: any, password: any){
        return await User.create({username,password})
    }
    // @ts-ignore
    async getUserinfo({username,id}: {username?: string,id?: number}){
        const whereOpt = {};//创建一个对象，这个对象就是包涵了需要查询的条件
        id && Object.assign(whereOpt,{id})//合并对象，如果有这个参数的话就合并进去进行查询，可以复用查询
        username && Object.assign(whereOpt,{username})

        const res = await User.findOne({
            attributes:['id','username','password','createdAt','updatedAt'],//查询成功后需要返回的字段
            where:whereOpt//查询条件
        })
        return res ? res.dataValues : false//如果成功查询到的话就返回数据，如果没有的话就GG
    }
}
export default new UserService()
