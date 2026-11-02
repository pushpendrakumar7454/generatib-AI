import {getApiKey,getSettingFile,saveApiKey} from './utils/file.utils.js'
import rl from './utils/readline.js'


async function main(){
    const settings=await getSettingFile()

    if(!settings.apiKey){
        const apiKey=await rl.question("Please Enter apiKey-: ")
        await saveApiKey(apiKey)
    }

    const response=await getApiKey()

    if(response.error){
        console.error("inavild apiKey and expired apiKey")

        const apiKey=await rl.question("Please Enter apikey-: ")
        await saveApiKey(apiKey)
        return main()
    }
    const apiKey=response.apiKey
    rl.close()

}