
import { ChatCohere } from "@langchain/cohere";
import dotenv from "dotenv";
dotenv.config();

const userInput = "Tell me about Aarav internship";

const model = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: process.env.COHERE_API_KEY
});

const response = await model.invoke(userInput);

console.log(response.content);
