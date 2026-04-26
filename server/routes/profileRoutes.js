import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadProfilePhoto } from "../middlewares/upload.js";
import {
  getProfile,
  updateProfile,
  updateProfilePhoto as updateProfilePhotoController,
} from "../controllers/profileController.js";

const router = express.Router();

// @route   GET /api/profile/me
// @desc    Get current user's profile
router.get("/me", authMiddleware, getProfile);

// @route   PUT /api/profile/me
// @desc    Update profile info (name, bio, college)
router.put("/me", authMiddleware, updateProfile);

// @route   PUT /api/profile/photo
// @desc    Upload / update profile photo
router.put("/photo", authMiddleware, uploadProfilePhoto.single("photo"), updateProfilePhotoController);

export default router;
