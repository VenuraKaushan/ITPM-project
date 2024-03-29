import express from "express";
import { 
    studentLogin,
    regResearchGroup,
    getResearchByLeader,
    getAssessment,
    uploadAssessmentDoc,
    submitAssessment
 } from "../controller/student.controller.js";




const router = express.Router();

//redirect to the all login controller
router.post("/login",studentLogin);
router.post("/group/registration",regResearchGroup);
router.post("/get/research/",getResearchByLeader);
router.get("/get/assessment",getAssessment);
router.post("/upload/assessment",uploadAssessmentDoc);//route for upload assessment to the multer
router.put("/upload/assessment/:id",submitAssessment)

export default router;
