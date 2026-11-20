import {MCPAdapter} from '@langchain/mcp-adapters'

const adapter=new MCPAdapter({
    servers:{
        calender:{
            command:"node",
            args:["../mcpserver/server.js"]
        }
}
})