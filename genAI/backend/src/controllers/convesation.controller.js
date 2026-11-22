export const handleMessageConversationController=async(req,res)=>{
    try {
        const {content,conversation}=req.body

        if(!conversation){
            
        }
        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}