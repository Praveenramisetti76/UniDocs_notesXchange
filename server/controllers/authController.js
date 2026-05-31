import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


export const register = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user);

    // Return token + user (without password)
    res.status(201).json({
      token,
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
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
export const login = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    // Return token + user (without password)
    res.json({
      token,
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
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   POST /api/auth/google
// @desc    Google OAuth callback
// @access  Public
export const googleAuth = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Missing Google token" });
  }

  try {
    // Verify the Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || email.split("@")[0];
    const profilePhoto = payload.picture || "";

    // Check if user exists with this Google ID
    let user = await User.findOne({ googleId });

    if (user) {
      // User exists, generate token
      const token = generateToken(user);
      return res.json({
        token,
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
    }

    // Check if user exists with this email (from local auth)
    user = await User.findOne({ email });

    if (user) {
      // Update existing user with Google ID if not already set
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = "google";
        if (profilePhoto && !user.profilePhoto) {
          user.profilePhoto = profilePhoto;
        }
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        googleId,
        name,
        email,
        profilePhoto: profilePhoto || "",
        authProvider: "google",
      });
    }

    // Generate token
    const jwtToken = generateToken(user);

    // Return token + user
    res.status(201).json({
      token: jwtToken,
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
    console.error("Google auth error:", error.message);
    res.status(400).json({ message: "Invalid Google token or authentication failed" });
  }
};
