import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadProfilePhoto } from "../middlewares/upload.js";
import {
  getProfile,
  updateProfile,
  updateProfilePhoto as updateProfilePhotoController,
} from "../controllers/profileController.js";

const router = express.Router();
router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateProfile);
router.put("/photo", authMiddleware, uploadProfilePhoto.single("photo"), updateProfilePhotoController);

export default router;
