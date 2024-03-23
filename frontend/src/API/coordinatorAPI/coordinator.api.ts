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

};

export default CoordinatorAPI;