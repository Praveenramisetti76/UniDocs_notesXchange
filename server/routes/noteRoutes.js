import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadNote as uploadMiddleware } from "../middlewares/upload.js";
import {
  uploadNote,
  getNotes,
  getNoteById,
  deleteNote,
  getUserNotes,
} from "../controllers/noteController.js";
import { voteNote, getMyVote, getUserVotes } from "../controllers/voteController.js";

const router = express.Router();

// @route   POST /api/notes/upload
// @desc    Upload a new note (protected)
router.post("/upload", authMiddleware, uploadMiddleware.single("file"), uploadNote);

// @route   GET /api/notes/my-uploads
// @desc    Get all notes uploaded by the current user (protected)
router.get("/my-uploads", authMiddleware, getUserNotes);

// @route   GET /api/notes/my-votes
// @desc    Get all votes cast by the current user (protected)
router.get("/my-votes", authMiddleware, getUserVotes);

// @route   GET /api/notes
// @desc    Get all notes with filters & pagination
router.get("/", getNotes);

// @route   POST /api/notes/:id/vote
// @desc    Upvote or downvote a note (protected)
router.post("/:id/vote", authMiddleware, voteNote);

// @route   GET /api/notes/:id/myvote
// @desc    Get current user's vote on a note (protected)
router.get("/:id/myvote", authMiddleware, getMyVote);

// @route   GET /api/notes/:id
// @desc    Get single note by ID
router.get("/:id", getNoteById);

// @route   DELETE /api/notes/:id
// @desc    Delete a note (protected, owner only)
router.delete("/:id", authMiddleware, deleteNote);

export default router;
