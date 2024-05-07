import express from "express";
import { registerMember , registerStudent , getStaffMembers , getAllStudentDetails , 
    updateStaffMember , updateStudentDetails , deleteStaffMember , deleteStudent , 
    getGroupDetails,getViewMarkSheet,getResearchPaperDetails,addAssestment,getAssestment , deleteAssestment,updateAssestmentDetails,
    getAssessmentMarks,compareAssessmentMarkId
 }  from "../controller/coordinator.controller.js";

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

router.get(`/getviewmarksheetdetails`,getViewMarkSheet);

router.get(`/getresearchpaperdetails`,getResearchPaperDetails);

router.post("/add/assestment", addAssestment);

router.get("/get/assessment",getAssestment);

router.delete("/assessment/delete/:id",deleteAssestment);

router.put("/assessment/update/:id",updateAssestmentDetails);

router.get('/get/assessmentMark',getAssessmentMarks);

router.get('/get/compareAssessmentMarkId/:id',compareAssessmentMarkId);



export default router;
