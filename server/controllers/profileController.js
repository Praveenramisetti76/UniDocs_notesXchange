import User from "../models/User.js";

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @access  Private
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

// @route   PUT /api/profile/me
// @desc    Update current user's profile (name, bio, college)
// @access  Private
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

// @route   PUT /api/profile/photo
// @desc    Upload / update profile photo
// @access  Private
export const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const photoPath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePhoto: photoPath },
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
