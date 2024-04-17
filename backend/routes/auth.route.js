import express from "express";
import {
  google,
  sendOTP,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup);

router.post("/sign-in", signin);

router.post("/google", google);

router.get("/sign-out", signout);

router.post("/send-otp", sendOTP);

export default router;
