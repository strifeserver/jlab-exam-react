import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { login } from "../common/ApiClient";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import Swal from 'sweetalert2';
function LoginPage({ isLoggedIn, setToken }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");
  Swal.close()

  useEffect(() => {
    if(!!storedToken){
      Swal.showLoading();
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  }, [storedToken, isLoggedIn]); 




  const handleLogin = async (email, password) => {
    try {
      const { accessToken, response } = await login(email, password);
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col sm={6}>



          {!!!storedToken && (
            <>
              <h2>Login Page</h2>
              <LoginForm onSubmit={handleLogin} />
              {message && <p className="mt-3 text-danger">{message}</p>}
            </>
          )}



        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
