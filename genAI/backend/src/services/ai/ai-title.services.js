import {ChatGroq} from '@langchain/groq'
import  * as z from 'zod'
import dotenv from 'dotenv'
dotenv.config()


const model=new ChatGroq({
    model:"qwen/qwen3.8-27b",
    apiKey:process.env.GROQ_API_KEY
})