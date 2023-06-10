import express from "express";
import { Signup, auth, home, login, logout } from "../Contoller/userController.js";
import { getProducts } from "../Contoller/productController.js";
const router = express.Router();

router.get('/',home)
router.post("/signup", Signup);
router.post("/login", login);
router.get("/auth", auth);
router.get("/logout", logout);

router.get('/products',getProducts)
router.get('/products/:id',)

export default router;
