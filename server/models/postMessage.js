import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const likeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    _id: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creator: String,
  category: String,
  selectedFile: String,
  likes: [likeSchema],
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
