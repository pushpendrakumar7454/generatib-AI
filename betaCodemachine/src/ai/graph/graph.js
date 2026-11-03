import {START,END,StateGraph} from "@langchain/langgraph"
import * as z from 'zod'

const stateFormat=z.object({
    messages:z.array(z.any())
})

const  graph=new StateGraph(stateFormat)
.addNode("LLMNode")

