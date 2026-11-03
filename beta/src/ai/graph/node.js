import {ChatGroq} from '@langchain/groq'
import {getApiKey} from '../../utils/file.utils.js'
import {AIMessage} from 'langchain'

export async function LLMNode(state){
    console.log(state)
   
    let model=new ChatGroq({
        model:"openai/gpt-oss-120b",
        apiKey:(await getApiKey()).apiKey
    })
   
    let stream=await model.stream(state.messages)
    process.stdout.write("AI: ")

    let aiMessages=""
    for await(const chunk of stream){
        process.stdout.write(chunk.content)
        aiMessages+=chunk.content
    }

    return {
        messages:[...state.messages,
            new AIMessage(aiMessages)
        ]
    }

}