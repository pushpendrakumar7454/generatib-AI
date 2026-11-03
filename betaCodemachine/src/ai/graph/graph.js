import {START,END,StateGraph} from "@langchain/langgraph"
import * as z from 'zod'
import { LLMNode } from "./node.js"
import rl from '../../utils/readline.js'
import {HumanMessage} from 'langchain'

const stateFormat=z.object({
    messages:z.array(z.any())
})

const  graph=new StateGraph(stateFormat)
.addNode("LLMNode",LLMNode)
.addEdge(START,"LLMNode")
.addEdge("LLMNode",END)
.compile()


export default async function initGraph(){
    let messages=[]
    while(true){
        const userInput=await rl.question("Enter your quation-: ")
        messages.push(new HumanMessage(userInput))
        const response=await graph.invoke({messages})
        messages=response.messages
     
    }

}
