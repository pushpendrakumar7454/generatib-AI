export const handleMessageConversationController=async(req,res)=>{
    try {
        const {content,conversation:conversationId}=req.body
         
        let conversation=null
        if(!conversationId){
                      
        }
        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}