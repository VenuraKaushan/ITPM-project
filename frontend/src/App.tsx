import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import { MantineProvider, Container } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <Container>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
      </Container>
    </MantineProvider>
  );
}

export default App;
