import {getApiKey,getSettingFile,saveApiKey} from '../src/utils/file.utils.js'
import readline from './utils/readline.js'


async function main(){
    const settings= await getSettingFile()
    
    if(!settings.apiKey){
        const apiKey=await readline.question("Please Enter api Key-: ")
        return saveApiKey(apiKey)
    }
    
    const response=await getApiKey()

    if(response.error){
        console.error("invalid api key and expried apikey")

        const apiKey=await readline.question("Please Enter apiKey-: ")
        await saveApiKey(apiKey)
        return main()
    }
    const apiKey=response.apiKey
    readline.close()
  

}