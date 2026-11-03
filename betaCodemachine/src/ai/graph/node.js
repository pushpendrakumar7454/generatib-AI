import {ChatGroq} from '@langchain/groq'
import {getApiKey} from '../../utils/file.utils.js'

export async function LLMNode(state){
  
    const model=new ChatGroq({
        model:"openai/gpt-oss-120b",
        apiKey:await getApiKey()
    })

    const stream=await model.stream(state.messages)
    process.stdout.write("AI: " )
    const aiMessages=""

    for await (const chunk of stream){
        process.stdout.write(chunk.text)
        aiMessages+=chunk.text
    }

    console.log(state)
    return state

}