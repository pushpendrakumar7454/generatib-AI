import { getSettingFile } from './utils/file.utils.js';
import rl from '../src/utils/readline.js'

async function main() {
    const setting = await getSettingFile();
    if(!setting.apikey){
        const apikey=await rl.question("plase enter your apiKey-: ")
    }
    console.log(setting);
}

export default main;