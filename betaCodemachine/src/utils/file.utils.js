import fs from 'fs/promises'
import  {CONFIG_DIR,HOME_DIR}  from './constant.js'
import path from 'path'

export async function getSettingFile(){
   try {
    await fs.access(CONFIG_DIR)

   } catch (error) {
    await fs.mkdir(CONFIG_DIR,{recursive:true})
   }

   const settingFilePath=path.join(CONFIG_DIR,"setting.json")
   try {
    await fs.access(settingFilePath)
    const content=await fs.readFile(settingFilePath,"utf-8")
    return  JSON.parse(content)
   } catch (error) {
    await fs.writeFile(settingFilePath,JSON.stringify({}))
    return {}
   }
}