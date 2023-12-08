import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignUp from "./LoginSignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
