import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { login } from "../common/ApiClient";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

function LoginPage({ isLoggedIn, setToken }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (email, password) => {
    try {
      const { accessToken, response } = await login(email, password);
      console.log("Login successful. Access token:", accessToken);
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col sm={6}>
          {!isLoggedIn ? (
            <>
              <h2>Login Page</h2>
              <LoginForm onSubmit={handleLogin} />
              {message && <p className="mt-3 text-danger">{message}</p>}
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
