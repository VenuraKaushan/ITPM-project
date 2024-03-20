import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import "./App.css";
import {  MantineProvider } from '@mantine/core';
import StaffLogin from "./components/AllLogin/StaffLogin";
import StudentDetails from "./components/Coordinator/AddStudent/StudentTable";
import { StudentHeader } from "./components/Student/studentHeader";
import { CoordinatorHeading } from "./components/Coordinator/CoordinatorHeading";
import { CoodinatorPage } from "./pages/CoodinatorPage";
import { GroupRegistration } from "./components/Student/GroupRegistration/index.tsx";
import PMemberHeader from "./components/ProjectMember/PMemberHeader";
import StaffPage from "./components/StaffPage";
import { ExaminerHeader } from "./components/Examiner/examinerHeader.tsx";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={< LandingPage/>} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path ="/studentdetails" element={<StudentDetails/>} />
          <Route path="/coordinator/dashboard" element={<CoordinatorHeading />} />
          <Route path ="/student/dashboard" element = {<StudentHeader/>}/>
          <Route path ="/coodinatorpage" element = {<CoodinatorPage/>}/>
          <Route path ="/group/register" element = {<GroupRegistration/>}/>
          <Route path="/pMember/dashboard" element = {<PMemberHeader/>}/>
          <Route path="/pMember/selection" element = {<StaffPage/>}/>
          <Route path="/examiner/dashboard" element = {<ExaminerHeader/>}/>

        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
