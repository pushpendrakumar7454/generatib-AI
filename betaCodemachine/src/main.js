import { getSettingFile } from './utils/file.utils.js';

async function main() {
    const setting = await getSettingFile();
    console.log(setting);
}

export default main;