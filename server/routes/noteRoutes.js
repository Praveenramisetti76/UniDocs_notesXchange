import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
import {
  uploadNote,
  getNotes,
  getNoteById,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// @route   POST /api/notes/upload
// @desc    Upload a new note (protected)
router.post("/upload", authMiddleware, upload.single("file"), uploadNote);

// @route   GET /api/notes
// @desc    Get all notes with filters & pagination
router.get("/", getNotes);

// @route   GET /api/notes/:id
// @desc    Get single note by ID
router.get("/:id", getNoteById);

// @route   DELETE /api/notes/:id
// @desc    Delete a note (protected, owner only)
router.delete("/:id", authMiddleware, deleteNote);

export default router;
