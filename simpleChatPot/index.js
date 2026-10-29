import {ChatGroq} from '@langchain/groq'
import rl from 'readline'
import dotenv from 'dotenv'
dotenv.config()

const readLine=rl.createInterface({
    input:process.stdin,
    output:process.stdout
})

const userInput=await readLine.question("Enter your quation-: ")




const model=new ChatGroq({
    model:"openai/gpt-oss-120b",
    apiKey:process.env.CROQ_API_KEY
})


const response=await model.invoke("hello")
console.log(response.content)