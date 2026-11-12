import {ChatGroq} from '@langchain/groq'
import {getApiKey} from '../../utils/file.utils.js'
import {AIMessage} from 'langchain'
import {upsertFileTool} from '../tools/file.tools.js'

export async function LLMNode(state){
    console.log(state)
   
    let model=new ChatGroq({
        model:"openai/gpt-oss-120b",
        apiKey:(await getApiKey()).apiKey
    })

    const modelWithTool=model.bindTools([upsertFileTool])
   
    let stream=await modelWithTool.stream(state.messages)
    process.stdout.write("AI: ")

    let aiMessages=null
    for await(const chunk of stream){
        console.log(chunk)
        process.stdout.write(chunk.content)
        if(!aiMessages) aiMessages=chunk 
        else aiMessages.concat(chunk)
        aiMessages+=chunk.content
    }
    process.stdout.write("\n")

    return {
        messages:[...state.messages,
            aiMessages
        ]
    }

}