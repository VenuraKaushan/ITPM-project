import express from "express";
import { 
    studentLogin,
    regResearchGroup,
    getResearchByLeader,
    getAssessment,
    uploadAssessmentDoc,
    submitAssessment,
    studentLogout,
    getSupervisors,
    changePassword,
    scanImage,
    publishResearch,
    getMarks,
 } from "../controller/student.controller.js";
import { validateUSers } from "../middlewares/authMiddleware.js";



const router = express.Router();

//redirect to the all login controller
router.post("/login",studentLogin);
router.get("/logout",studentLogout);
router.post("/group/registration",regResearchGroup);
router.post("/get/research/",getResearchByLeader);
router.get("/get/assessment",getAssessment);
router.post("/upload/assessment",uploadAssessmentDoc);//route for upload assessment to the multer
router.put("/upload/assessment/:id",submitAssessment)
router.get("/get/supervisors",getSupervisors);
router.put("/changePassword/:id",changePassword)
router.post("/upload/image",scanImage);
router.put("/publish/research/:id",publishResearch);
router.get("/get/marks/:id",getMarks);



export default router;
