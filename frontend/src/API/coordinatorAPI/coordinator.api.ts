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

};

export default CoordinatorAPI;