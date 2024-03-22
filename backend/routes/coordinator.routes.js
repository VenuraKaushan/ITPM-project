import express from "express";
import { registerMember , registerStudent , getStaffMembers } from "../controller/coordinator.controller.js";

const router = express.Router();

router.post(`/member/register`,registerMember);

router.post(`/student/register`,registerStudent);

router.get(`/getmembers`,getStaffMembers);




export default router;
