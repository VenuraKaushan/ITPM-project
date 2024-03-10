import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage"

const index = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
      </Routes>
    </Router>
    </div>
  )
}

export default index
