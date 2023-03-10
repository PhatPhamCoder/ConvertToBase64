import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  myFile: String,
});

export default mongoose.model.posts || mongoose.model("post", postSchema);
