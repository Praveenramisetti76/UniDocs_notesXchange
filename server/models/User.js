import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
    maxlength: 300,
  },
  college: {
    type: String,
    default: "",
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  googleId: {
    type: String,
    default: null,
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
