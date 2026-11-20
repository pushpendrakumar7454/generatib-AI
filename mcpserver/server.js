import {McpServer} from '@modelcontextprotocol/server'
import * as z from 'zod'



let EVENTS=[]
//mcpserver
const server=new McpServer({name:"calender-server",version:"1.0.0"})

server.registerTool(
    "create_event",
   {
     description:"Create a new calender event",
     inputSchema:z.object({
        title:z.string().describe("title of the event"),
        start:z.string().describe("start time of the event"),
        end:z.string().describe("End time of the event")
     })
   },
   async({title,start,end})=>{
      const event={title,start,end}
      EVENTS.push(event)
      return event
   }

)


