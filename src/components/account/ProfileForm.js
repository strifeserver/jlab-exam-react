import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Row, Col, Button } from "react-bootstrap";

function ProfileForm({ processUpdate, UserInfo }) {
  const [name, setName] = useState(UserInfo.name || "");
  const [email, setEmail] = useState(UserInfo.email || "");
  const [account_level, setAccount_level] = useState(
    UserInfo.account_level || "customer"
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(UserInfo.name || "");
    setEmail(UserInfo.email || "");
    setAccount_level(UserInfo.account_level || "customer");
  }, [UserInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";



    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      processUpdate({ name, email, account_level });
    }
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
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
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
            onChange={(e) => setAccount_level(e.target.value)}
            isInvalid={!!errors.account_level}
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.account_level}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Update Profile
      </Button>
    </Form>
  );
}

export default ProfileForm;
