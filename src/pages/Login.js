import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showInvalidCredentialsAlert, setShowInvalidCredentialsAlert] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://express-t4.onrender.com/api/login",
        {
          username: email,
          password: password,
        }
      );
      if (response.status === 200) {
        navigate("/users");
      }
    } catch (error) {
      console.log("There was an error: " + error);
      setErrorMessage("Incorrect Username and/or Password!");
      setShowInvalidCredentialsAlert(true);
    }
  };

  return (
    <div className="login-container">
      <p className="h1">Login</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button variant="primary" type="submit" className="mt-3">
          Log In
        </Button>
      </form>

      {showInvalidCredentialsAlert && (
        <div className="alert alert-danger mt-3" role="alert">
          <h5 className="alert-heading">Invalid credentials:</h5>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
