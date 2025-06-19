import mongoose from "mongoose";
const shapeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now }
});
const Shape = mongoose.model("Shape",shapeSchema)
export default Shape