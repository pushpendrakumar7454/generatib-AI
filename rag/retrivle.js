
import { ChatCohere,CohereEmbeddings } from "@langchain/cohere";
import {Pinecone} from '@pinecone-database/pinecone'
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


const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const index = pc.index("cohort-rag");

const results = await index.query({
    vector: vector,
    topK: 5,
    includeMetadata: true
});

console.log(results);


const model = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: process.env.COHERE_API_KEY
});

const response = await model.invoke(userInput);

console.log(response.content);
