import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type:String,
   
    },

    email: {
        type: String,
        required: true,

    },
    number:{
      type:String,
      required:true
    },

    password: {
        type: String,
        required: true
    },
    refreshToken:{
        type:String
    }
});

const userModel = mongoose.model("genAIusers", userSchema);

export default userModel