import fs from 'fs'
import  {CONFIG_DIR,HOME_DIR}  from './constant'
import path from 'path'

export async function getSettingFile(){
   try {
    await fs.access(CONFIG_DIR)

   } catch (error) {
    await fs.mkdir(CONFIG_DIR,{recursive:true})
   }

   const settingFilePath=path.json(CONFIG_DIR,"setting.json")
   try {
    await fs.access(settingFilePath)
    const content=await fs.readFile(settingFilePath,"utf-8")
    return  JSON.parse(content)
   } catch (error) {
    fs.writeFile(settingFilePath,JSON.stringify({}))
   }
}