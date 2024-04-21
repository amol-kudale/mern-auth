import { User, TeamUser } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import twilio from "twilio";

// const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); //1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); //1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); //Randomly generated num converted to string with 0-9 and A-Z (36) and last 8 characters taken (done twice and concatenated for more security )
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); //1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signed out successfully");
};

const generateOTP = () => {
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const sendOTP = async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    const OTP = generateOTP();
    await client.messages.create({
      body: `Your OTP verification code is ${OTP}`,
      messagingServiceSid: process.env.SERVICE_ID,
      to: mobileNumber,
    });
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};
