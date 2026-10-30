
import { ChatGroq } from "@langchain/groq";
import rl from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import { tool, createAgent } from 'langchain'
import * as z from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const events = []

const createEvent = tool(
    async function({ date, title, description }) {
        events.push({
            date,
            title,
            description
        })

        return "created event"
    },
    {
        name: "createEvent",
        description: "Create a new event with a date, title and description",
        schema: z.object({
            date: z.string(),
            title: z.string(),
            description: z.string()
        })
    }
)

const getEventTool = tool(
    async function({}) {
        return events
    },
    {
        name: "getEvents",
        description: "Retrieves all events",
        schema: z.object({})
    }
)

const readLine = rl.createInterface({
    input: stdin,
    output: stdout
})

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY
})

const agent = createAgent({
    model,
    tools: [createEvent, getEventTool]
})

let userMessage=[]

while(true){
    const userInput=await readLine.question("Enter your quation-: ")

    userMessage.push({
        role:"user",
        content:userInput
    })

    const stream=await agent.stream(
        {messages:userMessage},
        {streamMode:"messages"}
    )
    const aiResponse=""
    for await(const chunk of stream){
        const [messages]=chunk
        aiResponse+=messages.content||""
        process.stdout.write(messages.content||"")
    }

    userMessage.push({
        role:"assistent",
        content:aiResponse
    })

    process.stdout.write("\n")
}