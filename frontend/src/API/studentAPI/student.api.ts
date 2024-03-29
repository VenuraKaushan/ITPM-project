import axios from "axios";

const BASE_URL = "http://localhost:3001";

class StudentAPI {
    //student login api
    static studentLogin(values: { email: string, password: string }) {
        console.log(values)
        return axios.post(`${BASE_URL}/student/login`, values, { withCredentials: true });
    }
    static groupReg(formData: any) {
        console.log(formData)
        return axios.post(`${BASE_URL}/student/group/registration`, formData, { withCredentials: true });
    }

    static getResearch(user: any) {
        return axios.post(`${BASE_URL}/student/get/research/`,user,{ withCredentials: true });
    }

    static getAllAssessment() {
        return axios.get(`${BASE_URL}/student/get/assessment`, { withCredentials: true });
    }

    static submitAssessment(values: {
        _id: String,
        submitDoc: string,
        comment: String
    }) {
        console.log(values);
        return axios.put(`${BASE_URL}/student/upload/assessment/${values._id}`, values, { withCredentials: true})

    }

}

export default StudentAPI;