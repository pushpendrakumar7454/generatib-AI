import {ChatGroq} from '@langchain/groq'
import rl from "node:readline/promises"
import {stdin,stdout} from "node:process"
import {tool,createAgent} from 'langchain'
import * as z from 'zod';
import dotenv from 'dotenv'
dotenv.config()



const createEventTool=(
    async function({name,description,date}){

    },{
        
    }
)

const readLine=rl.createInterface({
    input:stdin,
    output:stdout
})

const model=new ChatGroq({
    model:"openai/gpt-oss-120b",
    apiKey:process.env.GROQ_API_KEY
})

const messages=[]

while(true){
    const userInput=await readLine.question("Enter your message- ")
    messages.push({
        role:"user",
        content:userInput
    })

    const stream=await model.stream(messages)
     let aiResponse=""
    for await (const chunk of stream){
       aiResponse+=chunk.content
       process.stdout.write(chunk.content)
    }
    process.stdout.write("\n")
}