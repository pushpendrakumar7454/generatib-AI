
import { ChatCohere,CohereEmbeddings } from "@langchain/cohere";
import dotenv from "dotenv";
dotenv.config();

const userInput = "Tell me about Aarav internship";

// inisilize imbedding quary

const embbedding=new CohereEmbeddings({
    apiKey:process.env.COHERE_API_KEY,
    model:"embed-v5,0-fast"
})

const vecter=await embbedding.embedQuery(userInput)

console.log(vecter)

const model = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: process.env.COHERE_API_KEY
});

const response = await model.invoke(userInput);

console.log(response.content);
