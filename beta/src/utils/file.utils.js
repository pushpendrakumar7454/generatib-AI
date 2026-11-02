import fs from 'fs/promises'
import path from 'path'
import {HOME_DIR,CONFIG_DIR} from './constant.js'
import { json } from 'zod'


export async function getSettingFile(){
    try {
        await fs.access(CONFIG_DIR)
    } catch (error) {
        await fs.mkdir(CONFIG_DIR,{recursive:true})
    }

    const settingFilePath=path.join(CONFIG_DIR,"settings.json")

    try {
        await fs.access(settingFilePath)
        const content=fs.readFile(settingFilePath,"utf-8")
        return JSON.parse(content)
    } catch (error) {
        await fs.writeFile(settingFilePath,JSON.stringify({}))
        return {}
    }
}


export async function saveApiKey(){
    const settingFilePath=path.join(CONFIG_DIR,"settings.json")
    const settingContent=await getSettingFile()

    await fs.writeFile(settingFilePath,JSON.stringify({
        ...settingContent,
        apiKey
    }))
}


export 