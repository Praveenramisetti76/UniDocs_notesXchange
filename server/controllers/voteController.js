import Vote from "../models/Vote.js";
import Note from "../models/Note.js";

// @route   POST /api/notes/:id/vote
// @desc    Upvote or downvote a note (toggle/switch logic)
// @access  Private
export const voteNote = async (req, res) => {
  try {
    const { voteType } = req.body;
    const noteId = req.params.id;
    const userId = req.user.id;

    if (!["upvote", "downvote"].includes(voteType)) {
      return res.status(400).json({ message: "voteType must be 'upvote' or 'downvote'" });
    }

    // Check if the note exists
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check for existing vote
    const existingVote = await Vote.findOne({ userId, noteId });

    if (!existingVote) {
      // Case 1: No existing vote — create new vote
      await Vote.create({ userId, noteId, voteType });

      if (voteType === "upvote") {
        note.upvotes += 1;
      } else {
        note.downvotes += 1;
      }
    } else if (existingVote.voteType === voteType) {
      // Case 2: Same voteType — toggle off (remove vote)
      await Vote.findByIdAndDelete(existingVote._id);

      if (voteType === "upvote") {
        note.upvotes = Math.max(0, note.upvotes - 1);
      } else {
        note.downvotes = Math.max(0, note.downvotes - 1);
      }
    } else {
      // Case 3: Different voteType — switch vote
      existingVote.voteType = voteType;
      await existingVote.save();

      if (voteType === "upvote") {
        note.upvotes += 1;
        note.downvotes = Math.max(0, note.downvotes - 1);
      } else {
        note.downvotes += 1;
        note.upvotes = Math.max(0, note.upvotes - 1);
      }
    }

    await note.save();

    res.json({
      upvotes: note.upvotes,
      downvotes: note.downvotes,
    });
  } catch (error) {
    console.error("Vote error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/notes/:id/myvote
// @desc    Get current user's vote on a note
// @access  Private
export const getMyVote = async (req, res) => {
  try {
    const vote = await Vote.findOne({
      userId: req.user.id,
      noteId: req.params.id,
    });

    res.json({
      voteType: vote ? vote.voteType : null,
    });
  } catch (error) {
    console.error("Get vote error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
