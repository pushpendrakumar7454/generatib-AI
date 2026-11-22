import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  refreshToken: { type: String, default: null, select: false }
}, { timestamps: true });

export default mongoose.model("genusers", userSchema);
