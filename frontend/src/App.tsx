import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import { MantineProvider, Container } from '@mantine/core';
import StaffLogin from "./components/Login/StaffLogin";


function App() {
  return (
    <MantineProvider>
      <Container>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/staff-login" element={<StaffLogin />} />
        </Routes>
      </Router>
      </Container>
    </MantineProvider>
  );
}

export default App;
