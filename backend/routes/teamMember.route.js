import express from "express";
import{
    createMember,
    searchMembers,
    showMembers,
    deleteMember,
} from "../controllers/teamMember.controller.js"

const router = express.Router();

router.post("/create-member", createMember);
router.get('/members/:userId', showMembers)
router.get('/members/search/:userId', searchMembers)
router.delete('/members/:memberId', deleteMember)

export default router; 