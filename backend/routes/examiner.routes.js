import express from "express";
import { 
    getResearchGroupByExaminer 
} from "../controller/examiner.controller.js";
import { validateUSers } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.get("/get/allResearch",getResearchGroupByExaminer);

export default router;
