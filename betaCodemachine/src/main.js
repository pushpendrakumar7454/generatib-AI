
import { getSettingFile, saveApiKey, getApiKey } from './utils/file.utils.js';
import rl from '../src/utils/readline.js';

async function main() {
    const setting = await getSettingFile();

    if (!setting.apiKey) {
        const apiKey = await rl.question("Please enter your apiKey: ");

        await saveApiKey(apiKey);
    }

    const response= await getApiKey();
    
    if(response.error){
        const apiKey=await rl.question("Please enter a apiKey-: ")
        await saveApiKey(apiKey)
        return main()
    }
    const apiKey=response.apiKey

    rl.close();
}

export default main;
