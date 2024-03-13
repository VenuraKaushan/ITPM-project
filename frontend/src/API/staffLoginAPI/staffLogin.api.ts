import axios from "axios";

const BASE_URL = "http://localhost:3001";

class StaffLoginAPI{

    static login (values : {email : string, password : string}) {
        console.log(values)
        return axios.post(`${BASE_URL}/staff/login`,values,{withCredentials:true});
    }
}

export default StaffLoginAPI;