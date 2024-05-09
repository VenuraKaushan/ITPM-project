import express from "express";
import { 
    getResearchGroupByExaminer,
    changePassword,
    getRubrics,
    submitMarks,
    getExistingMarks,
    getGroupMarksByExaminer 
} from "../controller/examiner.controller.js";
import { validateUSers } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.get("/get/allResearch",getResearchGroupByExaminer);
router.put("/changePassword/:id",changePassword)
router.get("/get/allRubrics",getRubrics);
router.put("/submit/marks",submitMarks);
router.get("/get/existing/marks/:id",getExistingMarks);
router.get("/get/marks",getGroupMarksByExaminer);


export default router;
