import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import "./App.css";
import { MantineProvider } from '@mantine/core';
import StaffLogin from "./components/AllLogin/StaffLogin";
import { StudentHeader } from "./components/Student/studentHeader";
import { CoordinatorHeading } from "./components/Coordinator/CoordinatorHeading";
import { CoodinatorPage } from "./pages/CoodinatorPage";
import { GroupRegistration } from "./components/Student/GroupRegistration/index.tsx";
import PMemberHeader from "./components/ProjectMember/PMemberHeader";
import { ViewMarkSheetPage } from "./pages/CoodinatorPage/viewMarkSheetPage.tsx";

import { ExaminerHeader } from "./components/Examiner/examinerHeader.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from "@mantine/notifications";
import StudentLogout from "./components/AllLogin/StudentLogout.tsx";
import StaffLogout from "./components/AllLogin/staffLogout.tsx";

function App() {
  const client = new QueryClient();
  return (
    <MantineProvider>
      <Notifications style={{marginTop:-400}} w={400} position="bottom-left" zIndex={2077} />
      <ModalsProvider>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={< LandingPage />} />
              <Route path="/staff-login" element={<StaffLogin />} />

              <Route path="/coordinator/dashboard" element={<CoordinatorHeading />} />
              <Route path="/student/dashboard" element={<StudentHeader />} />
              <Route path="/coodinatorpage" element={<CoodinatorPage />} />
              <Route path="/ViewMarkSheetPage" element={<ViewMarkSheetPage />} />

              <Route path="/group/register" element={<GroupRegistration />} />
              <Route path="/pMember/dashboard" element={<PMemberHeader />} />

              <Route path="/examiner/dashboard" element={<ExaminerHeader />} />
              <Route path="/student/logout" element={<StudentLogout />} />
              <Route path="/staff/logout" element={<StaffLogout />} />


            </Routes>
          </Router>
        </QueryClientProvider >
      </ModalsProvider>
    </MantineProvider>

  );
}

export default App;
