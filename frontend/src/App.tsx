import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import "./App.css";
import {  MantineProvider } from '@mantine/core';
import StaffLogin from "./components/AllLogin/StaffLogin";
import StudentDetails from "./components/Coordinator/AddStudent/StudentTable";


function App() {
  return (
    <MantineProvider>
      
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path ="/studentdetails" element={<StudentDetails/>} />
         
        </Routes>
      </Router>

     
     
    </MantineProvider>
  );
}

export default App;
