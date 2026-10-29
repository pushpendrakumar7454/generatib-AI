import {ChatGroq} from '@langchain/groq'
import rl from 'node:readline/promises'
import {stdin,stdout} from 'node:process'

import dotenv from 'dotenv'
dotenv.config()


const readLine=rl.createInterface({
    input:stdin,
    output:stdout
})