import express from "express";
import { 
    studentLogin,
    regResearchGroup,
    getResearch
 } from "../controller/student.controller.js";

const router = express.Router();

//redirect to the all login controller
router.post("/login",studentLogin);
router.post("/group/registration",regResearchGroup);
router.get("/get/research",getResearch);


export default router;
