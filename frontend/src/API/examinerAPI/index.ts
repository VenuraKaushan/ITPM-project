import axios from "axios";

const BASE_URL = "http://localhost:3001";

class ExaminerAPI {
    static getResearchGroupByExaminer () {
        return axios.get(`${BASE_URL}/examiner/get/allResearch`, { withCredentials: true });
    }
    

}

export default ExaminerAPI;