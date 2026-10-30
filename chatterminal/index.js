import { ChatGroq} from '@langchain/groq';
import rl from 'node:readline/promises'
import {stdin,stdout} from 'node:process'
import dotenv from 'dotenv'
dotenv.config()


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
    const userInput=await readLine.question("Enter your quations-: ")

    messages.push({
        role:"user",
        content:userInput
    })

    const stream=await model.stream(messages)

    let aiMessages=""

    for await (const chunk of stream){
        aiMessages+=chunk.content
        process.stdout.write(chunk.content)
    }

    process.stdout.write("\n")
}