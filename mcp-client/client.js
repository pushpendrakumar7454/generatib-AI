import { MCPAdapter } from "@langchain/mcp-adapters";

const adapter = new MCPAdapter({
    servers: {
        calendar: {
            command: "node",
            args: ["../mcpserver/server.js"]
        }
    }
});

const tools = await adapter.listTools();

console.log("Available tools:", tools);