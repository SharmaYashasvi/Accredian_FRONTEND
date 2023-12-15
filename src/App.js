import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginSignUp from "./LoginSignUp";
import Task from "./task";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/box" element={<Task />} />
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
