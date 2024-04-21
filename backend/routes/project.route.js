import express from "express";
import {
  createProject,
  createWing,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create-project/:id", createProject);

router.post("/create-wing/:id", createWing);

export default router;
