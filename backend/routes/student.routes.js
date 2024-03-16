import express from "express";
import { studentLogin } from "../controller/student.controller.js";

const router = express.Router();

//redirect to the all login controller
router.post("/login",studentLogin);

export default router;
