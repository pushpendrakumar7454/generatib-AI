import {ChatGroq} from '@langchain/groq'
import {getApiKey} from '../../utils/file.utils.js'
import {AIMessage} from 'langchain'
import {upsertFile,readFile} from '../tools/file.tools.js'
import * as fileTools from '../tools/file.tools.js'

export async function LLMNode(state,config){
    console.log(state)
   
    let model=new ChatGroq({
        model:"openai/gpt-oss-120b",
        apiKey:(await getApiKey()).apiKey
    })

    const modelWithTool=model.bindTools([upsertFile,readFile])
   
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


export async function ToolNode(state,config){
    const messages=state.messages
    const lastMessage=state.messages[state.messages.length-1]

    const toolCalls=lastMessage.tool_calls


    const toolsResults=await Promise.all(toolCalls.map(async(toolCall)=>{
        return await fileTools[toolCall.name].invoke(toolCall)
    }))

    return {
        messages:[
            ...state.messages,
            ...toolsResults
        ]
    }
}