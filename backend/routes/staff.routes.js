import express from "express";
import { staffLogin  } from "../controller/staff.login.controller.js";

const router = express.Router();



//redirect to the all login controller
router.post("/login",staffLogin);

export default router;
