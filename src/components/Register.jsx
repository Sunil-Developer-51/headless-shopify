// src/components/Register.jsx
import React, { useState } from "react";
import { registerCustomer } from "../api";
import { useNavigate } from "react-router-dom";
import '../style/AuthPage.css'; // Import CSS for styling

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerCustomer(firstName, lastName, email, password);
      if (response.customer) {
        navigate("/login");
      } else {
        setErrorMessage("Error during registration");
      }
    } catch (error) {
      setErrorMessage("Error during registration");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
          <button type="submit" className="btn">Register</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="redirect-text">Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
}

export default Register;
