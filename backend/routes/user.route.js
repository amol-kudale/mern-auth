import express from "express";
import {
  createProject,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);

router.post("/update/:id", verifyToken, updateUser);

router.post("/create-project/:id", createProject);

export default router;
