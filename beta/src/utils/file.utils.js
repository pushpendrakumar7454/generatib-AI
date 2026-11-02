import fs from 'fs/promises'
import path from 'path'
import {HOME_DIR,CONFIG_DIR} from './constant.js'
import axios from 'axios'


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


export async function getApiKey(){
    const setting=await getSettingFile()
    const apiKey=setting.apiKey ||null

    if(!apiKey){
        throw new Error("api key is found in setting.json")
    }


    try {
        const response=await axios.get("https://api.groq.com/openai/v1/models",{
            headers:{
                Authorization:`Bearer ${apiKey}`
            }
        })

        return apiKey
    } catch (error) {
        return {
            error:"invalid apiKey"
        }
    }
}