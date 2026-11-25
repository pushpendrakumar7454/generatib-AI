import { generateTitle } from "../services/ai/ai-title.services.js"

export const handleMessageConversationController=async(req,res)=>{
    try {
        const {content,conversation:conversationId}=req.body
        const user=req.user 

        let conversation=null
        if(!conversationId){
          const {title} =  generateTitle(content)
                      
        }
        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}