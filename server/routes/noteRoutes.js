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

router.post("/upload", authMiddleware, uploadMiddleware.single("file"), uploadNote);

router.get("/my-uploads", authMiddleware, getUserNotes);

router.get("/my-votes", authMiddleware, getUserVotes);

router.get("/", getNotes);

router.post("/:id/vote", authMiddleware, voteNote);

router.get("/:id/myvote", authMiddleware, getMyVote);

router.get("/:id", getNoteById);

router.delete("/:id", authMiddleware, deleteNote);

export default router;
