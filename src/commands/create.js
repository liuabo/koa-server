const inquirer = require("inquirer")
const {red} = require("kolorist")
const CREATE_TYPES=['model',"service","router","middleware","controller","all"]
const DoesItExist = require("./createModel")//文件创建的方法，因为写在里面太乱了，我抽离出来单独维护
async function onCreate(cmd) {
    console.log(cmd)
    let {type} = cmd
    //如果没有在命令参数里面带入type那么就询问一次
    if(!type) {
        console.log(type)
        const result = await inquirer.prompt([
            {
                //用于获取后的属性名
                name:'type',
                //交互方式为列表单选
                type:"list",
                //提示信息
                message:'(必填) 请选择创建类型:',
                //选项列表
                choices:CREATE_TYPES,
                //默认值,这里是下标索引
                default:0
            }
        ])
        type = result.type
    }
    //如果获取的类型不在我们的支持范围内，那么输出错误提示并且重新选择
    if(CREATE_TYPES.every((t) => type !== t)){
        console.log(
            red(`当前类型仅支持：${CREATE_TYPES.join(', ')}，收到不在支持范围内的 "${type}"，请重新选择！`)
        )
        return onCreate()
    }
    try {
        switch (type) {
            case 'model'|'service'|'router'|'middleware'|'controller':
                const info = await inquirer.prompt([
                    {
                        name:'name',
                        type:'input',
                        message:`(必填) 请选择创建${type}的名称:`,
                        validate: (value) => {
                            if (value.trim() === '') {
                                return '组件 name 是必填项！'
                            }
                            return true
                        }
                    }

                ])
                await DoesItExist(info.name,type)
                break
            case 'all'://如果是all则在配置的文件夹都创建文件
                const all = await inquirer.prompt([
                    {
                        name:'name',
                        type:'input',
                        message:`(必填) 请选择创建${type}的名称:`,
                        validate: (value) => {
                            if (value.trim() === '') {
                                return '组件 name 是必填项！'
                            }
                            return true
                        }
                    }

                ])
                //创建model文件
                const createModel =  DoesItExist(all.name,"model")
                //创建service文件
                const createService =  DoesItExist(all.name,"service")
                //创建router文件
                const createRouter =  DoesItExist(all.name,"router")
                //创建middleware文件
                const createMiddleware =  DoesItExist(all.name,"middleware")
                //创建controller文件
                const createController =  DoesItExist(all.name,"controller")
                await Promise.all([createModel,createService,createRouter,createMiddleware,createController])
                break
            default:

                break
        }
    } catch (e){
        console.error(e)
    }
}
module.exports={
    onCreate
}
