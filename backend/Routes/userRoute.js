import express from "express";
import multer from "multer";
import  {authUser}  from "../middleware/auth.js";
import {
  Signup,
  auth,
  home,
  login,
  logout,
} from "../Contoller/userController.js";
import {
  addProduct,
  getCategories,
  getItem,
  getProducts,
} from "../Contoller/productController.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", Signup);
router.post("/login", login);
router.get("/auth", auth);

router.use(authUser)

router.get("/logout", logout);
router.get("/", home);
router.get("/products", getProducts);
router.post("/add-product", upload.single("image"), addProduct);
router.get("/products/:id", getItem);
router.get("/categories", getCategories);

export default router;
