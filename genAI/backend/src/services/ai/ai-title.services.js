
import { ChatGroq } from "@langchain/groq";
import * as z from "zod";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import dotenv from "dotenv";

dotenv.config();

// Initialize Model
const model = new ChatGroq({
    model: "qwen/qwen3-32b",
    apiKey: process.env.GROQ_API_KEY
});

// Structured Output
const structureModel = model.withStructuredOutput(
    z.object({
        title: z.string()
            .min(1)
            .max(60)
            .describe("The title of the conversation based on the user's messages")
    })
);

// Generate Conversation Title
export async function generateTitle(message) {

    const systemMessage = new SystemMessage(`
        You are a conversation title generator.

        Your task is to generate a short, meaningful title
        based on the user's conversation.

        Rules:
        1. Generate a title related to the user's message.
        2. Keep the title between 2 and 6 words.
        3. Do not use quotation marks.
        4. Do not provide explanations.
        5. Return the title in the required JSON structure.
    `);

    const humanMessage = new HumanMessage(`
        Generate a suitable title for this conversation:
        ${message}
    `);

    try {
        const response = await structureModel.invoke([
            systemMessage,
            humanMessage
        ]);

        return response;

    } catch (error) {
        console.log("Title Generation Error:", error.message);
        throw error;
    }
}
