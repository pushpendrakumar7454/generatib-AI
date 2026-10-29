import {ChatGroq} from '@langchain/groq'
import {} from  'readline'
import dotenv from 'dotenv'
dotenv.config()


const model=new ChatGroq({
    model:"openai/gpt-oss-120b",
    apiKey:process.env.CROQ_API_KEY
})


const response=await model.invoke("hello")
console.log(response.content)