import {getApiKey,getSettingFile,saveApiKey} from './utils/file.utils.js'
import rl from './utils/readline.js'

async function main(){
    const settings=await getSettingFile()

    if(!settings.apiKey){
        const apiKey=await rl.question("Please Enter valid apiKey-: ")
        return saveApiKey(apiKey)

    }

    const response=await getApiKey()

    if(response.error){
        console.error("invalid api key and expire api key")

        const apiKey=await rl.question("Please Enter apiKey-: ")
        await saveApiKey(apiKey)
        return main()
    }
    const apiKey=response.apiKey
    rl.close()
}