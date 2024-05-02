import express from "express";
import { 
    getResearchGroupByExaminer,
    changePassword,
    getRubrics 
} from "../controller/examiner.controller.js";
import { validateUSers } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.get("/get/allResearch",getResearchGroupByExaminer);
router.put("/changePassword/:id",changePassword)
router.get("/get/allRubrics",getRubrics);


export default router;
