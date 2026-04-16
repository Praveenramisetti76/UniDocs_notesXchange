import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
    required: true,
  },
  voteType: {
    type: String,
    required: true,
    enum: ["upvote", "downvote"],
  },
});

// Compound unique index to prevent duplicate votes per user per note
voteSchema.index({ userId: 1, noteId: 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);
