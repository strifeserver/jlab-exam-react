import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header({ isLoggedIn, setToken, setIsLoggedIn }) {
  const handleLogout = () => {
    // Clear token and logout logic
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken(null);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Exam</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/registration">Register</Nav.Link>
            {isLoggedIn ? (<Nav.Link onClick={handleLogout}>Logout</Nav.Link> ) : null}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
