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

};

export default CoordinatorAPI;