import {ChatGroq} from '@langchain/groq'
import {getApi} from '../../utils/file.utils.js'

export async function LLMNode(state){
    console.log(state)
   
    let model=new ChatGroq({
        model:"openai/gpt-oss-120b",
        apiKey:await getApi()
    })
   
    let stream=await model.stream(state.messages)
    process.stdout.write("AI: ")

    let aiMessages=""
    for await(const chunk of stream){
        process.stdout.write(chunk.text)
        aiMessages+=chunk.text
    }

    return state

}