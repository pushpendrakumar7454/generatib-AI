import { ChatGroq } from "@langchain/groq";
import rl from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { tool, createAgent } from "langchain";
import * as z from "zod";
import dotenv from "dotenv";
dotenv.config();

let events = [];

const createEventTool = tool(
  async function ({ title, description, date }) {
    events.push({
      title,
      description,
      date,
    });
    return "createdEvent";
  },
  {
    name: "createEvent",
    description: "create a event with title description and date",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
    }),
  },
);


const getEventTool=tool(
    async function({}){
        return events
    },{
        name:"getEvents",
        description:"get all events",
        schema:z.object()
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


const agent=createAgent({
    model,
    tools:[createEventTool,getEventTool]
})


while(true){
    const userInput=await readLine.question("Enter your quations-: ")

    const stream=await agent.stream({
        messages:[
            {
                role:"user",
                content:userInput
            }
        ]
    },{
        streamMode:"messages"
    })

    for await(const chunk of stream){
        const [messages]=chunk
        process.stdout.write(messages.content||"")
    }

    process.stdout.write("\n")
}