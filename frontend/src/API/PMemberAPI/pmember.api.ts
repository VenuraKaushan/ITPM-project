import axios from "axios";

const BASE_URL = "http://localhost:3001";

class PMemberAPI{

    //staff member login api
    static addRubrics (values : {selectedValue : object[], tableData : object[]}) {
        console.log(values)
        return axios.post(`${BASE_URL}/pm/add/rubrics`,values,{withCredentials:true});
    }

  
};

export default PMemberAPI;