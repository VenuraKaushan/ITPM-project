import express from "express";
import { addRubrics } from "../controller/pMember.controller.js";
import { addAssestment } from "../controller/pMember.controller.js";

const router = express.Router();

router.post("/add/rubrics", addRubrics);
router.post("/add/assestment", addAssestment);

export default router;
