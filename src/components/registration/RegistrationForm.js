import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Row, Col, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
function RegistrationForm({ processRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [account_level, setaccount_level] = useState("customer");
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (!account_level) newErrors.account_level = "User type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      processRegister({ name, email, password, account_level });
    }
    Swal.showLoading();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col sm={3}>
          <p>Name: </p>
        </Col>
        <Col sm={9}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3}>
          <p>Email: </p>
        </Col>
        <Col sm={9}>
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3}>
          <p>Password: </p>
        </Col>
        <Col sm={9}>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3}>
          <p>Confirm Password: </p>
        </Col>
        <Col sm={9}>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3}>
          <p>User Type: </p>
        </Col>
        <Col sm={9}>
          <Form.Control
            as="select"
            value={account_level}
            onChange={(e) => setaccount_level(e.target.value)}
            isInvalid={!!errors.account_level}
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.account_level}</Form.Control.Feedback>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default RegistrationForm;
