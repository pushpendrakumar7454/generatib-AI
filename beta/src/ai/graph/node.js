import {ChatGroq} from '@langchain/groq'
import {getApiKey} from '../../utils/file.utils.js'
import {AIMessage} from 'langchain'
import {upsertFile,readFile,listFiles} from '../tools/file.tools.js'
import * as fileTools from '../tools/file.tools.js'

export async function LLMNode(state,config){
    console.log(state)
   
    let model=new ChatGroq({
        model:"openai/gpt-oss-120b",
        apiKey:(await getApiKey()).apiKey
    })

    const modelWithTool=model.bindTools([upsertFile,readFile,listFiles])
   
    let stream=await modelWithTool.stream(state.messages)
    process.stdout.write("AI: ")

    let aiMessages=null
    for await(const chunk of stream){
        process.stdout.write(chunk.content)
        if(!aiMessages) aiMessages=chunk 
        else aiMessages=aiMessages.concat(chunk)
       
    }
    process.stdout.write("\n")

    return {
        messages:[...state.messages,
            aiMessages
        ]
    }

}



export async function ToolNode(state, config) {
    const messages = state.messages
    const lastMessage = messages[messages.length - 1]
    const toolCalls = lastMessage.tool_calls || []

    const toolsResults = await Promise.all(
        toolCalls.map(async (toolCall) => {
            const tool = Object.values(fileTools).find(
                (item) => item?.name === toolCall.name
            )

            if (!tool) {
                throw new Error(`Tool not found: ${toolCall.name}`)
            }

            return await tool.invoke(toolCall)
        })
    )

    return {
        messages: [
            ...messages,
            ...toolsResults
        ]
    }
}
