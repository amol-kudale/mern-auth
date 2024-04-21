import express from "express";
import {
  createProject,
  updateProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create-project/:id", createProject);

router.post("/update-project/:id", updateProject);

export default router;
