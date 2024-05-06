import axios from "axios";

const BASE_URL = "http://localhost:3001";

class ExaminerAPI {
    static getResearchGroupByExaminer() {
        return axios.get(`${BASE_URL}/examiner/get/allResearch`, { withCredentials: true });
    }

    static setNewPassword = (values: {
        _id: String,
        currentPassword: String,
        newPassword: String,
        confirmPassword: String
    }) => {
        return axios.put(`${BASE_URL}/examiner/changePassword/${values._id}`, values, { withCredentials: true });

    }

    static getRubrics() {
        return axios.get(`${BASE_URL}/examiner/get/allRubrics`, { withCredentials: true });
    }

    static submitMarks (data:any){
        console.log(data)
        return axios.post(`${BASE_URL}/examiner/submit/marks`, data,{ withCredentials: true });

    }

}

export default ExaminerAPI;