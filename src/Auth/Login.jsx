// src/pages/Login.js
import React from "react";
// import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  // const { login } = useAuth();

  const handleLogin = () => {
    // Simulate login logic (e.g., API call)
    // login();
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
