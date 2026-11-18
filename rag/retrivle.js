
import { ChatCohere, CohereEmbeddings } from "@langchain/cohere";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const userInput = "Tell me about Aarav internship";

// Initialize Embeddings
const embedding = new CohereEmbeddings({
    apiKey: process.env.COHERE_API_KEY,
    model: "embed-v5.0-fast",
    inputType: "search_query"
});

// Generate Vector
const vector = await embedding.embedQuery(userInput);

console.log("Vector Length:", vector.length);

// Check Dimension
if (vector.length !== 2048) {
    throw new Error("Embedding dimension must be 2048");
}

// Initialize Pinecone
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const index = pc.index("cohort-rag");

// Search Documents
const results = await index.documents.search({
    topK: 5,
    scoreBy: [
        {
            type: "dense_vector",
            fields: ["embedding"],
            values: vector
        }
    ],
    includeFields: ["content"]
});

console.log("Search Results:", results);

// Initialize Chat Model
const model = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: process.env.COHERE_API_KEY
});

// Generate AI Response
const response = await model.invoke(`
Answer the question using the following context:

${JSON.stringify(results)}

Question: ${userInput}

If the answer is not available in the context,
say you don't know.
`);

console.log("AI Response:", response.content);
