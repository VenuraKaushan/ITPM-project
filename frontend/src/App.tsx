import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import "./App.css";
import {  MantineProvider } from '@mantine/core';
import StaffLogin from "./components/AllLogin/StaffLogin";
import StudentDetails from "./components/Coordinator/AddStudent/StudentTable";
import { StudentHeader } from "./components/Student/studentHeader";
import { GroupRegistration } from "./components/Student/GroupRegistration/index.tsx";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path ="/studentdetails" element={<StudentDetails/>} />
          <Route path ="/student/dashboard" element = {<StudentHeader/>}/>
          <Route path ="/group/register" element = {<GroupRegistration/>}/>
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
