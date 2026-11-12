
import fs from 'fs/promises'
import { CONFIG_DIR } from './constant.js'
import path from 'path'
import axios from 'axios'

export async function getSettingFile() {
    try {
        await fs.access(CONFIG_DIR)
    } catch (error) {
        await fs.mkdir(CONFIG_DIR, { recursive: true })
    }

    const settingFilePath = path.join(CONFIG_DIR, "setting.json")

    try {
        await fs.access(settingFilePath)

        const content = await fs.readFile(settingFilePath, "utf-8")

        return JSON.parse(content)

    } catch (error) {
        await fs.writeFile(settingFilePath, JSON.stringify({}))
        return {}
    }
}

export async function saveApiKey(apiKey) {
    const settingFilePath = path.join(CONFIG_DIR, "setting.json")

    const settingContent = await getSettingFile()

    await fs.writeFile(
        settingFilePath,
        JSON.stringify({
            ...settingContent,
            apiKey: apiKey
        }, null, 2)
    )
}

export async function getApiKey() {
    const setting = await getSettingFile()

    const apiKey = setting.apiKey || null

    if (!apiKey) {
        throw new Error("Api key not found in setting json")
    }

    try {
        const response = await axios.get(
            "https://api.groq.com/openai/v1/models",
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            }
        )

        return {
            apiKey: apiKey
        }

    } catch (error) {
        return {
            error: "invalid apikey"
        }
    }
}
