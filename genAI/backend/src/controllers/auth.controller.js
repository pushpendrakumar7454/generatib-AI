import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { createAccessToken, createRefreshToken, setRefreshCookie, clearRefreshCookie } from "../utils/tokens.js";

function safeUser(user) {
  return { id: user._id, name: user.name, email: user.email };
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email is already registered" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    const accessToken = createAccessToken(user._id.toString());
    const refreshToken = createRefreshToken(user._id.toString());
    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();

    setRefreshCookie(res, refreshToken);
    return res.status(201).json({ message: "Registration successful", accessToken, user: safeUser(user) });
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password +refreshToken");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = createAccessToken(user._id.toString());
    const refreshToken = createRefreshToken(user._id.toString());
    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();

    setRefreshCookie(res, refreshToken);
    return res.json({ message: "Login successful", accessToken, user: safeUser(user) });
  } catch (error) { next(error); }
}

export async function refresh(req, res, next) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "Refresh token missing" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      clearRefreshCookie(res);
      return res.status(401).json({ message: "Refresh token is invalid or expired" });
    }

    const user = await User.findById(decoded.userId).select("+refreshToken");
    if (!user || !user.refreshToken || !(await bcrypt.compare(token, user.refreshToken))) {
      clearRefreshCookie(res);
      return res.status(401).json({ message: "Refresh token has been revoked" });
    }

    const newAccessToken = createAccessToken(user._id.toString());
    const newRefreshToken = createRefreshToken(user._id.toString());
    user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    setRefreshCookie(res, newRefreshToken);
    return res.json({ accessToken: newAccessToken, user: safeUser(user) });
  } catch (error) { next(error); }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user: safeUser(user) });
  } catch (error) { next(error); }
}

export async function logout(req, res, next) {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        await User.findByIdAndUpdate(decoded.userId, { refreshToken: null });
      } catch {
        // Expired or invalid cookie: still clear it on the client.
      }
    }
    clearRefreshCookie(res);
    return res.json({ message: "Logout successful" });
  } catch (error) { next(error); }
}
