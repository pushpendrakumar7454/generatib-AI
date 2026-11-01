import {getSettingFile} from '../src/utils/file.utils.js'


async function main(){
    const setting=getSettingFile()
    console.log(setting)
}