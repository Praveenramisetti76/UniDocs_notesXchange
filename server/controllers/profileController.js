import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

// Helper: extract Cloudinary public_id from a URL
const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    const afterUpload = parts[1].replace(/^v\d+\//, "");
    // Remove file extension for images
    return afterUpload.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, bio, college } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name.trim();
    if (bio !== undefined) updateFields.bio = bio.trim();
    if (college !== undefined) updateFields.college = college.trim();

    // Validate name is not empty
    if (updateFields.name !== undefined && updateFields.name.length === 0) {
      return res.status(400).json({ message: "Name cannot be empty" });
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateFields, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        college: user.college,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Delete old profile photo from Cloudinary if it exists
    const currentUser = await User.findById(req.user.id);
    if (currentUser?.profilePhoto) {
      try {
        const oldPublicId = getPublicIdFromUrl(currentUser.profilePhoto);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId, {
            resource_type: "image",
          });
        }
      } catch (cleanupErr) {
        console.error("Old photo cleanup error:", cleanupErr.message);
      }
    }

    // req.file.path contains the full Cloudinary URL
    const photoUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePhoto: photoUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile photo updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        college: user.college,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update photo error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
