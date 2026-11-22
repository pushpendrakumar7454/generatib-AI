import mongoose from "mongoose";



export const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "tool"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GenAIConversation",
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } },
);

messageSchema.index({ conversation: 1, createdAt: 1 });

export const MessageModel = mongoose.model("GenAiMessage", messageSchema);
