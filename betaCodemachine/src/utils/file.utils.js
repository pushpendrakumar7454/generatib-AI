import fs from 'fs'
import  {CONFIG_DIR,HOME_DIR}  from './constant'
import path from 'path'

export const getSettingFile=async()=>{
   try {
    await fs.access(CONFIG_DIR)
   } catch (error) {
    await fs.mkdir(CONFIG_DIR,{recursive:true})
   }
   const settingFilePath=path.json(CONFIG_DIR,"setting.json")
   try {
    await fs.access(settingFilePath)
   } catch (error) {
    fs.writeFile(settingFilePath,JSON.stringify({}))
   }
}