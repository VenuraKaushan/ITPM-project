import axios from "axios";

const BASE_URL = "http://localhost:3001";

class CoordinatorAPI{

    static memberRegister(values:{
        name : string, email : string , phone: string, specialization : string , role : string
    }){
        return axios.post(`${BASE_URL}/coordinator/member/register`,values,{withCredentials:true});
    }

    static studentRegister(values:{
        name : string, email : string , regNo : string , specialization : string , batch : string , semester : string
    }){
        return axios.post(`${BASE_URL}/coordinator/student/register`,values,{withCredentials:true});
    }

    //Get All Staff Member Details
    static getAllStaffMemberDetails(){

        return axios.get(`${BASE_URL}/coordinator/getmembers`,{withCredentials:true});
    }

    //Get All Stundet Details
    static getAllStudentDetails(){

        return axios.get(`${BASE_URL}/coordinator/getstudents`,{withCredentials:true});
        
    }

    static updateStaffMember = (values:{
        _id : string;
        name : string;
        email : string;
        phone : string;
        specialization : string;
        role : string;
    }) =>{
        return axios.put(`${BASE_URL}/coordinator/member/update/${values._id}`, values,
        {withCredentials:true})
       
    };

    static updateStudentDetails = (values:{
        _id : string;
        name : string;
        email : string;
        regNo : string;
        specialization : string;
        batch : string;
        semester : string;
    }) =>{
        return axios.put(`${BASE_URL}/coordinator/student/update/${values._id}`, values,
        {withCredentials:true})
       
    };

    //delete staff member
    static deleteMember = (values : {_id : string}) =>{
        return axios.delete(`${BASE_URL}/coordinator/member/delete/${values._id}`,{withCredentials:true});
    };

    //delete Student
    static deleteStudent = (values : {_id : string}) =>{
        return axios.delete(`${BASE_URL}/coordinator/student/delete/${values._id}`,{withCredentials:true});
    };

    //get all group details to assign project member
    static getGroupDetails(){

        return axios.get(`${BASE_URL}/coordinator/getgroupdetails`,{withCredentials:true});
    }

    //Get view Mark Sheet Details
    static getViewMarkSheetDetaiils(){
        return axios.get(`${BASE_URL}/coordinator/getviewmarksheetdetails`,{withCredentials:true});
    }

    //Get Research Group Details
    static getResearchPaperDetails(){
        return axios.get(`${BASE_URL}/coordinator/getresearchpaperdetails`,{withCredentials:true});
    }

    //Add Research Paper
    static addAssestment (values : {
        assessmentName : string,
        submitDoc : string,
        deadline : string,
        semester : string,
        specialization : string
    }) {
        
        return axios.post(`${BASE_URL}/coordinator/add/assestment`,values,{withCredentials:true});
    }

    static getAssessment() {
        return axios.get(`${BASE_URL}/coordinator/get/assessment`,{ withCredentials: true });
    }

    //delete Assessments
    static deleteAssestment = (values : {_id : string}) =>{
        console.log("api")
        return axios.delete(`${BASE_URL}/coordinator/assessment/delete/${values._id}`,{withCredentials:true});
    };

    //Update Assessments details
    static updateAssestmentDetails = (values:{
        _id : string,
        assessmentName : string,
        submitDoc : string,
        deadline : string,
        semester : string,
        specialization : string
    }) =>{
        return axios.put(`${BASE_URL}/coordinator/assessment/update/${values._id}`, values,
       
        {withCredentials:true})
       
    };

    //Get assessmentMark
    static getAssessmentMarks() {
        return axios.get(`${BASE_URL}/coordinator/get/assessmentMark`,{ withCredentials: true });
    }

    //get comapare Id
    static getAssessmentMarksByGroupId(groupID:any){
        console.log(groupID)
        return axios.get(`${BASE_URL}/coordinator/get/compareAssessmentMarkId/${groupID}`,{ withCredentials: true });
    }

    //Update Assessments Marks
    static updateAssestmentMark = (values:{
        _id : string,
        registrationNumber : string,
        proposalMarks : string,
        progress1Marks : string,
        progress2Marks : string,
        finalPresentationMarks : string
    }) =>{
        return axios.put(`${BASE_URL}/coordinator/updateAssestmentMark/update/${values._id}`, values,

        
        {withCredentials:true})
       
    };

  

    


};

export default CoordinatorAPI;