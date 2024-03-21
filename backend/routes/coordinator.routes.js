import express from "express";
import { registerMember } from "../controller/coordinator.controller.js";

const router = express.Router();

router.post(`/member/register`,registerMember);




export default router;
