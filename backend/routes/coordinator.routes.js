import express from "express";
import { registerMember , registerStudent , getStaffMembers , getAllStudentDetails , 
    updateStaffMember , updateStudentDetails , deleteStaffMember , deleteStudent , getGroupDetails }  from "../controller/coordinator.controller.js";

const router = express.Router();

router.post(`/member/register`,registerMember);

router.post(`/student/register`,registerStudent);
router.get(`/getmembers`,getStaffMembers);

router.get(`/getstudents`,getAllStudentDetails);

router.put("/member/update/:id",updateStaffMember);

router.put("/student/update/:id",updateStudentDetails);

router.delete("/member/delete/:id",deleteStaffMember);

router.delete("/student/delete/:id",deleteStudent);

router.get(`/getgroupdetails`,getGroupDetails);



export default router;
