import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export async function Signup(req, res) {
  try {
    const { name, email, mobile, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, salt);
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: true, message: "User Exist" });
    }
    const newUser = new User({ name, email, mobile, password: hashPassword });
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      "secretkey"
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ error: false });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: true, message: "user not found" });
    }
    const validate = bcrypt.compareSync(password, user.password);
    if (!validate) {
      return res.json({ error: true, message: "Wrong email or password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      "secretkey"
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
        sameSite: "none",
      })
      .json({ error: false, user: user._id });
  } catch (err) {
    res.json({ error: err });
  }
}

export async function logout(req, res) {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .json({ error: false, message: "Logout Successfull" });
  } catch (err) {
    res.json({ error: err });
  }
}

export async function auth(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ error: true, message: "Authentication Failed" });
    }
    const verified = jwt.verify(token, "secretkey");
    const user = await User.findById(verified.id);
    if (!user) {
      return res.json({ login: false });
    }
    return res.json({ login: true });
  } catch (error) {
    res.json({ error: error.message });
  }
}
