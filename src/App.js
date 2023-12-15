import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginSignUp from "./LoginSignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
      </Routes>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
    </Router>
  );
};

export default App;
