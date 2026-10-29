import {ChatGroq} from '@langchain/groq'
import rl from 'node:readline/promises'
import dotenv from 'dotenv'
import {stdin,stdout} from 'node:process'
dotenv.config()

const readline=rl.createInterface({
    input:stdin,
    output:stdout
})

const model=new ChatGroq({
    model:"openai/gpt-oss-120b",
    apiKey:process.env.GROQ_API_KEY
})


while(true){
    const userInput=await readline.question("Enter your quations-: ")

    const stream=await model.stream([
       {
         role:"user",
        content:userInput
       }
    ])

    for await ( const chunk of stream){
        process.stdout.write(chunk.content)
    }
    process.stdout.write("/n")

}