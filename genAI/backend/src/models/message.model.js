
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "genusers",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        lastMessage: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const messageModel = mongoose.model("GenAIMessage", messageSchema);

export default messageModel;
