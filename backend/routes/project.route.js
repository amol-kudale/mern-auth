import express from "express";
import {
  createFloor,
  createProject,
  createWing,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create-project/:id", createProject);

router.post("/create-wing/:id", createWing);

router.post("/create-floor/:floorId", createFloor);

export default router;
