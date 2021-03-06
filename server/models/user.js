import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  avatar: { type: String },
  wallpaper: { type: String },
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostMessage' }],
  
});

var User = mongoose.model("User", userSchema);

export default User;