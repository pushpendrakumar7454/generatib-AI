import { getSettingFile,saveApiKey,getApiKey } from './utils/file.utils.js';
import rl from '../src/utils/readline.js'

async function main() {
    const setting = await getSettingFile();
    if(!setting.apikey){
        const apikey=await rl.question("plase enter your apiKey-: ")
        await saveApiKey(apikey)
    }
    const apiKey=await getApiKey()
    console.log(apiKey)
  
}

export default main;