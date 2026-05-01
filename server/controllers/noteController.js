import cloudinary from "../config/cloudinary.js";
import Note from "../models/Note.js";

const getPublicIdFromUrl = (url) => {
  try {

    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
  
    const afterUpload = parts[1].replace(/^v\d+\//, "");
    return afterUpload;
  } catch {
    return null;
  }
};

// @route   POST /api/notes/upload
// @desc    Upload a new note
// @access  Private
export const uploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const { title, subject, subjectCode, semester, branch } = req.body;

    // Validate required fields
    if (!title || !subject || !semester || !branch) {
      // If validation fails, try to remove the already-uploaded Cloudinary file
      if (req.file.path) {
        const publicId = getPublicIdFromUrl(req.file.path);
        if (publicId) {
          const isPdf = req.file.mimetype === "application/pdf";
          await cloudinary.uploader.destroy(publicId, {
            resource_type: isPdf ? "raw" : "image",
          });
        }
      }
      return res.status(400).json({
        message: "Title, subject, semester, and branch are required",
      });
    }

  
    const fileType = req.file.mimetype === "application/pdf" ? "pdf" : "image";

    const note = await Note.create({
      title,
      subject,
      subjectCode: subjectCode || "",
      semester: Number(semester),
      branch,
      fileUrl: req.file.path,
      fileType,
      uploadedBy: req.user.id,
    });

    const populated = await note.populate("uploadedBy", "name");

    res.status(201).json(populated);
  } catch (error) {
    // Clean up Cloudinary file on error
    if (req.file && req.file.path) {
      try {
        const publicId = getPublicIdFromUrl(req.file.path);
        if (publicId) {
          const isPdf = req.file.mimetype === "application/pdf";
          await cloudinary.uploader.destroy(publicId, {
            resource_type: isPdf ? "raw" : "image",
          });
        }
      } catch (cleanupErr) {
        console.error("Cleanup error:", cleanupErr.message);
      }
    }
    console.error("Upload error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const getNotes = async (req, res) => {
  try {
    const { semester, subject, branch, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (semester) filter.semester = Number(semester);
    if (subject) filter.subject = { $regex: subject, $options: "i" };
    if (branch) filter.branch = branch;
    if (search) filter.subjectCode = { $regex: search, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);

    const [notes, total] = await Promise.all([
      Note.find(filter)
        .populate("uploadedBy", "name")
        .sort({ upvotes: -1, downvotes: 1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Note.countDocuments(filter),
    ]);

    res.json({
      notes,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      totalNotes: total,
    });
  } catch (error) {
    console.error("Get notes error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate("uploadedBy", "name email");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("Get note error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user.id })
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });

    res.json({ notes, total: notes.length });
  } catch (error) {
    console.error("Get user notes error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check ownership
    if (note.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this note" });
    }

    // Remove file from Cloudinary
    if (note.fileUrl) {
      try {
        const publicId = getPublicIdFromUrl(note.fileUrl);
        if (publicId) {
          const resourceType = note.fileType === "pdf" ? "raw" : "image";
          await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
          });
        }
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr.message);
      }
    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
