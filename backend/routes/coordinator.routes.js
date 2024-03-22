import express from "express";
import { registerMember , registerStudent } from "../controller/coordinator.controller.js";

const router = express.Router();

router.post(`/member/register`,registerMember);

router.post(`/student/register`,registerStudent);




export default router;
