import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
function Header({ isLoggedIn, setToken, setIsLoggedIn }) {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('token');
  const [showLogout, setShowLogout] = useState(!!storedToken); 

  const handleLogout = () => {
    Swal.showLoading();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn);
    setShowLogout(!!storedToken);
  }, [storedToken]); 

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Exam</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/registration">Register</Nav.Link>
            {showLogout && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
