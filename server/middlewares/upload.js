import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Cloudinary storage for note files (PDFs + images)
const noteStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";
    return {
      folder: "unidocs/notes",
      resource_type: isPdf ? "raw" : "image",
      allowed_formats: isPdf ? ["pdf"] : ["jpg", "jpeg", "png"],
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`,
    };
  },
});

// Cloudinary storage for profile photos
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "unidocs/profiles",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
    public_id: (req, file) => `profile-${req.user.id}-${Date.now()}`,
  },
});

// File filter: allow only pdf, jpg, jpeg, png
const noteFileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPG, JPEG, and PNG files are allowed"), false);
  }
};

// File filter for profile photos
const photoFileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, and WebP images are allowed"), false);
  }
};

// Upload middleware for notes
export const uploadNote = multer({
  storage: noteStorage,
  fileFilter: noteFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Upload middleware for profile photos
export const uploadProfilePhoto = multer({
  storage: profileStorage,
  fileFilter: photoFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Default export for backward compatibility
export default uploadNote;
