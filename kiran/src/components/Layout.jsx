import React from "react";
import { Routes, Route } from "react-router-dom";
import { About } from "./About";
import FunState from "./FunState";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Registration from "./Registration";
import Profile from "./Profile";
import Home from "./Home";
import Logout from "./Logout";
import "./Layout.css"; 

const Layout = () => {
  return (
    <div className="container">
      {/* Navbar only visible after login */}
      <div className="header">
        <ResponsiveAppBar />
      </div>
      
      <div className="lsb">LSB</div>
      
      <div className="main">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/counter" element={<FunState />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          
        </Routes>
      </div>
      
      {/* Footer only visible after login */}
      <div className="footer">Footer</div>
    </div>
  );
};

export default Layout;
