import express from "express";
import {
  showProject,
  createFloor,
  createProject,
  createWing,
  getProjectById,
  updateProject,
  allocateMembersToProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create-project/:id", createProject);

router.post("/create-wing/:id", createWing);

router.post("/create-floor/:floorId", createFloor);

router.get("/show-project/:userId", showProject);

router.get('/project-details/:projectId', getProjectById);

router.put('project-details/:projectId', updateProject);

router.post('/allocate-members/:projectId', allocateMembersToProject);


export default router;
