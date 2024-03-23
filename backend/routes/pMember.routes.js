import express from "express";
import { addRubrics } from "../controller/pMember.controller.js";

const router = express.Router();

router.post("/add/rubrics", addRubrics);

export default router;
