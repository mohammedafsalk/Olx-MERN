import express from "express";
import { Signup, auth, login, logout } from "../Contoller/userController.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/auth", auth);

export default router;
