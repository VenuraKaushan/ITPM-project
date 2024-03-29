import express from "express";
import { 
    addRubrics ,
    addAssestment
} from "../controller/pMember.controller.js";
import { uploadQuestiontDoc } from "../controller/pMember.controller.js";

const router = express.Router();

router.post("/add/rubrics", addRubrics);
router.post("/add/assestment", addAssestment);
router.post("/question/upload", uploadQuestiontDoc);


export default router;
