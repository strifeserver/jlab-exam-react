import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Home from './components/home/Home';
import LoginPage from './components/login/LoginPage';
import RegistrationPage from './components/registration/RegistrationPage';
import ProfilePage from './components/account/ProfilePage';
import Header from './components/common/Header';
import { validateToken } from "./components/common/ApiClient";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [UserInfo, setUserInfo] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [token, setToken] = useState(null); 

  useEffect(() => {
    checkAuthenticationStatus();
  }, [UserInfo]);

  const checkAuthenticationStatus = () => {
    const storedToken = localStorage.getItem('token');
    const isAuthenticated = !!storedToken; 
    setIsLoggedIn(isAuthenticated);
    setToken(storedToken);
    setLoading(false);
    tokenValidate(storedToken)

  };

  const tokenValidate = async (token) => {
    try {
      const response = await validateToken();
      setUserInfo({id: response.result.user.id, code: response.result.user.code, account_level: response.result.user.account_level, name: response.result.user.first_name, email: response.result.user.email, account_status: response.result.user.account_status})
    } catch (error) {
      console.error('Error during token validation:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }
  
  
  return (
    <Router>
          <Header isLoggedIn={isLoggedIn} setToken={setToken} setIsLoggedIn={setIsLoggedIn} > </Header>
      <Container>

        <Row className="justify-content-md-center">
          <Col>
            <div className="App">
              <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                <Route path="/home" element={<Home isLoggedIn={isLoggedIn} UserInfo={UserInfo} />} />
                <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setToken={setToken} />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/update_profile" element={<ProfilePage isLoggedIn={isLoggedIn} UserInfo={UserInfo} />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
