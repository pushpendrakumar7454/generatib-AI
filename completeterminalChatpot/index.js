import { ChatGroq } from "@langchain/groq";
import rl from 'node:readline/promises'
import {stdin,stdout} from 'node:process'
import {tool} from 'langchain'
import dotenv from 'dotenv'
dotenv.config()


const events=[]
const creaateEvent =tool(
    async function({date,title, description }){
        events.push({
            date,title,description
        })
        return "created event"
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

while(true){

    const userInput=await readLine.question("Enter your quations-: ")

    const stream=await model.stream([
        {
            role:"user",
            content:userInput
        }
    ])

    for await (const chunk of stream){
        process.stdout.write(chunk.content)
    }

    process.stdout.write("\n")
}