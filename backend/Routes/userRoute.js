import express from "express";
import { Signup, login } from "../Contoller/userController.js";
const router = express.Router();

router.post('/signup',Signup)
router.post('/login',login)

export default router;
