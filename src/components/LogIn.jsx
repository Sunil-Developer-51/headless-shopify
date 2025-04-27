// src/components/Login.jsx
import React, { useState } from "react";
import { loginCustomer } from "../api";
import { useNavigate } from "react-router-dom";
import './AuthPage.css'; // Import CSS for styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginCustomer(email, password);
      if (response.customerAccessToken) {
        localStorage.setItem("accessToken", response.customerAccessToken.accessToken);
        navigate("/account");
      } else {
        setErrorMessage("Invalid login credentials");
      }
    } catch (error) {
      setErrorMessage("Error during login");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="redirect-text">Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
}

export default Login;
