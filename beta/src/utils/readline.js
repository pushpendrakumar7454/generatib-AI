import rl from 'readline/promises'
import {stdin,stdout} from 'node:process'


const readline=rl.createInterface({
    input:stdin,
    output:stdout
})

export default  readline