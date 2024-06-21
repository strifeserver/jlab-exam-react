import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Row, Col, Button } from "react-bootstrap";

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
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
              required
            />
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
              required
            />
          </InputGroup>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
