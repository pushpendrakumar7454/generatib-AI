import os from 'os'
import path from 'path'
import fs from 'fs/promises'
import axios from 'axios'
import {HOME_DIR,CONFIG_DIR} from './constant.js'

export async function getSettingFile(){
    try {
        await fs.access(CONFIG_DIR)
    } catch (error) {
        await fs.mkdir(CONFIG_DIR,{recursive:true})
    }

    const settingFilePath=path.join(CONFIG_DIR,"setting.json")
    try {
        await fs.access(settingFilePath)
        const contant=fs.readFile(settingFilePath,"utf-8")
        return JSON.parse(contant)
    } catch (error) {
        await fs.writeFile(settingFilePath,JSON.stringify({}))
        return {}
    }
}


export async function saveApiKey(){
    const settingFilePath=path.join(CONFIG_DIR,"settingg.json")
    const settingContent=await getSettingFile()

    await fs.writeFile(settingFilePath,JSON.stringify({
        ...settingContent,
        apiKey
    }))
}

export async function getApiKey(){
    const setting=await getSettingFile()
    const apiKey=setting.apiKey||null
    if(!apiKey){
        throw new Error("api key is found in setting.json")
    }

    try {
        const reasponse=await axios.get("https://api.groq.com/openai/v1/models",{
            headers:{
                Authorization:`Bearer ${apiKey}`
            }
        })
        return apiKey
    } catch (error) {
        return {
            error:"invalid api key"
        }
    }
}
