import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";

function App() {
  return (
    
      <Routes>
        {/* Default to Login page */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected Routes - Shown only after login */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    
  );
}

export default App;
