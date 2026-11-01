
import { ChatGroq } from "@langchain/groq";
import rl from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { tool } from "langchain";
import * as z from "zod";
import { START, END, StateGraph, MessagesAnnotation } from "@langchain/langgraph";
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
        description: "create an event with title, description and date",
        schema: z.object({
            title: z.string(),
            description: z.string(),
            date: z.string(),
        }),
    }
);

const getEventTool = tool(
    async function () {
        return events;
    },
    {
        name: "getEvents",
        description: "get all events",
        schema: z.object({}),
    }
);

const readLine = rl.createInterface({
    input: stdin,
    output: stdout,
});

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
});

async function LLMNode(state) {
    console.log("LLMNode", state);

    return {
        messages: [
            {
                role: "assistant",
                content: "Hello, user",
            },
        ],
    };
}

const graph = new StateGraph(MessagesAnnotation)
    .addNode("LLMNode", LLMNode)
    .addEdge(START, "LLMNode")
    .addEdge("LLMNode", END)
    .compile();

const graphResult = await graph.invoke({
    messages: [
        {
            role: "user",
            content: "hello, world",
        },
    ],
});

console.log(graphResult);