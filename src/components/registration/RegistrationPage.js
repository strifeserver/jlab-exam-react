import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { register } from "../common/ApiClient";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

function RegistrationPage({ isLoggedIn, setToken }) {
  const [message, setMessage] = useState("");
  const [Form, setForm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [isLoggedIn, navigate]);

  const processRegister = async (data) => {
      const { response } = await register(data);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    };

  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col sm={6}>
          {!isLoggedIn ? (
            <>
              <h2>Registration</h2>
              <RegistrationForm  processRegister={processRegister} />
              {message && <p className="mt-3 text-danger">{message}</p>}
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationPage;
