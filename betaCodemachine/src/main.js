
import { getSettingFile, saveApiKey, getApiKey } from './utils/file.utils.js';
import rl from '../src/utils/readline.js';
import initGraph from './ai/graph/graph.js';

async function main() {
    const setting = await getSettingFile();

    if (!setting.apiKey) {
        const apiKey = await rl.question("Please enter your apiKey: ");

        await saveApiKey(apiKey);
    }

    const response= await getApiKey();
    
    if(response.error){
        console.error("Invalid apiKey and expired apiKey")
        const apiKey=await rl.question("Please enter a apiKey-: ")
        await saveApiKey(apiKey)
        return main()
    }
    const apiKey=response.apiKey
    await initGraph()

    rl.close();
}

export default main;
