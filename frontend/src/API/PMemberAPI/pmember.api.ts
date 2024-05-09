import axios from "axios";

const BASE_URL = "http://localhost:3001";

class PMemberAPI {
  //staff member login api
  static addRubrics(values: { selectedValue: object[]; tableData: object[] }) {
    console.log(values);
    return axios.post(`${BASE_URL}/pm/add/rubrics`, values, {
      withCredentials: true,
    });
  }

  static addAssestment(values: {
    assessmentName: string;
    submitDoc: string;
    deadline: string;
    semester: string;
    specialization: string;
  }) {
    return axios.post(`${BASE_URL}/pm/add/assestment`, values, {
      withCredentials: true,
    });
  }

  static editAssestment(values: {
    _id: string;
    assessmentName: string;
    submitDoc: string;
    deadline: string;
    semester: string;
    specialization: string;
  }) {
    console.log(values);
    return axios.put(`${BASE_URL}/pm/edit/assestment/${values._id}`, values, {
      withCredentials: true,
    });
  }

  static getAllAssessment() {
    return axios.get(`${BASE_URL}/pm/get/assessment`, {
      withCredentials: true,
    });
  }

  static deleteAssestment = (values: { _id: string }) => {
    console.log(values);
    return axios.delete(`${BASE_URL}/pm/assessment/delete/${values._id}`, {
      withCredentials: true,
    });
  };

  static sheduleViva(values: {
    special: string;
    date: string;
    timeDuration: string;
  }) {
    console.log(values)
    return axios.put(`${BASE_URL}/pm/shecule/viva`, values, {
      withCredentials: true,
    });
  }

  static getResearch(){
    return axios.get(`${BASE_URL}/pm/get/research/`,{ withCredentials: true });

  }


}

export default PMemberAPI;
