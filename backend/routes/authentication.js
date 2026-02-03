import express from "express";
import User from "../models/User.js";
import { generateJwtToken } from "../middlewares/jwtAuth.js";
import { hashedPassword, comparePassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // if user does not exist or password do not match return error res
    // if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordCorrect = await comparePassword(password, user.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect || !user)
      return res.status(401).json({ error: "Wrong Email or Password" });

    // generate the token
    const payload = { id: user.id, userName: user.userName, email };
    const token = generateJwtToken(payload);
    // console.log(token);

    // we will store token in http only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // we will set true in production
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ message: "You are logged in" });
  } catch (error) {
    console.log("Error in login route", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  console.log("existing user: ", existingUser);

  if (!userName || !email || !password) {
    return res.status(422).json({ error: "All fields are mandatory" });
  }

  if (existingUser) {
    return res.status(409).json({
      error: "User Already Exist Try to Login",
    });
  }

  try {
    // get the hashed password
    const hashPassword = await hashedPassword(password);
    const user = User({ userName, email, password: hashPassword });
    const newUser = await user.save();
    console.log("new user: ", user);

    // generating token using payload as userData
    const payload = {
      id: newUser.id,
      userName: newUser.userName,
      email: newUser.email,
    };

    const token = generateJwtToken(payload);
    console.log("Token is: ", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    return res.status(201).json({ message: "new user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// route to verify the jwt token
router.get("/verify", async (req, res) => {
  const token = req.cookies.token;

  // console.log(token);

  if (!token) return res.status(401).json({ error: "Not Authenticated" });

  try {
    // we are checking that the token is tamperd or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.json({ user: decoded });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

// route to logout user from the frontend
router.post("/logout", (req, res) => {
  console.log("cookie is: ", req.cookies.token);
  res.clearCookie("token");
  res.status(200).json({ message: "Log Out" });
});

export default router;
