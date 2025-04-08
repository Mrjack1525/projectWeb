import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios";
import "./Layout.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for redirection
  const signup = ()=> {
    navigate("/register");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/login", // Replace with your backend login route
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        // On success, store token in localStorage
        const token = response.data.token;
        const payload = JSON.parse(atob(token.split(".")[1]));
        localStorage.setItem("token", token);
        localStorage.setItem("role", payload.role);
      
        alert(response.data.message || "Login successful!");
        
        // Redirect to Profile (inside Layout)
        navigate("/profile");
      } else {
        setError("Invalid credentials!");
      }
      
    } catch (error) {
      console.error("Error logging in:", error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
        <span onClick={signup}> Register </span>

      </form>
    </div>
  );
};

export default Login;
