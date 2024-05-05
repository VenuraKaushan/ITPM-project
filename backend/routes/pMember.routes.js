import express from "express";
import { 
    addRubrics ,
    addAssestment,
    getAssessment,
    editAssestment,
    deleteAssestment
} from "../controller/pMember.controller.js";
import { uploadQuestiontDoc } from "../controller/pMember.controller.js";

const router = express.Router();

router.post("/add/rubrics", addRubrics);
router.post("/add/assestment", addAssestment);
router.post("/question/upload", uploadQuestiontDoc);
router.put("/edit/assestment/:id", editAssestment);
router.get("/get/assessment",getAssessment);
router.delete("/assessment/delete/:id",deleteAssestment);


export default router;
