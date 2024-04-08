import express from "express";
import { staffLogin,Stafflogout  } from "../controller/staff.login.controller.js";

const router = express.Router();



//redirect to the all login controller
router.post("/login",staffLogin);
router.get("/logout",Stafflogout);

export default router;
