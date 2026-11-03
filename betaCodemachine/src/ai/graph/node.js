import {ChatGroq} from '@langchain/groq'
import {getApiKey} from '../../utils/file.utils.js'

export async function LLMNode(state){
  
    const model=new ChatGroq({
        model:"openai/gpt-oss-120b",
        apiKey:await getApiKey()
    })

    console.log(state)
    return state

}