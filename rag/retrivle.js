
import { ChatCohere,CohereEmbeddings } from "@langchain/cohere";
import dotenv from "dotenv";
dotenv.config();

const userInput = "Tell me about Aarav internship";

// inisilize imbedding quary

const embedding = new CohereEmbeddings({
    apiKey: process.env.COHERE_API_KEY,
    model: "embed-v4.0"
});

const vector = await embedding.embedQuery(userInput);

console.log(vector);

const model = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: process.env.COHERE_API_KEY
});

const response = await model.invoke(userInput);

console.log(response.content);
