import axios from "axios";

const BASE_URL = "http://localhost:3001";

class StudentAPI{
    //student login api
    static studentLogin (values : {email : string, password : string}) {
        console.log(values)
        return axios.post(`${BASE_URL}/student/login`,values,{withCredentials:true});
    }


}

export default StudentAPI;