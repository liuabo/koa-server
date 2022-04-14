const fs = require('fs-extra')
const {blue, red} = require("kolorist")
async function DoesItExist (name,type){
    const exists = await fs.pathExists(`./src/${type}/${name}.${type}.ts`)

    if (!exists){//检查文件是否存在
        createModel(name,type)
    } else {
        console.log(red("文件已经存在"))
    }
}

function createModel(name,type) {
    fs.ensureFile(`./src/${type}/${name}.${type}.ts`,(err) => {
        if(err){
            throw  err
        } else {
            console.log(blue(`./src/${type}/${name}.${type}.ts,创建完成`))
        }
    })
}

module.exports = DoesItExist
