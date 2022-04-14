const {Sequelize} = require("sequelize");
const seq = new Sequelize("mysql_test",'root','root',{
    port : 3306,
    host:"127.0.0.1",
    dialect:"mysql"
})

 seq.authenticate().then(() => {
     console.log("和你的数据连接成功了！")
 }).catch((err) => {
     console.log("数据库连接失败",err)
 })

module.exports = seq
