import express from "express";
import { getAllUsers, login,register,getMyProfile,logout } from "../controllers/user.js"
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/logout", logout);

router.post("/login", login);

router.get("/me",isAuthenticated ,getMyProfile);

export default router;