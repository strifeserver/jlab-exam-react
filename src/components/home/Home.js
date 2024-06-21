import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { validateToken } from "../common/ApiClient";
function Home({ isLoggedIn, UserInfo }) {
  const navigate = useNavigate(); 

  if (isLoggedIn == false) {
    navigate("/login");
  }

  const handleProfileUpdate = (event) => {
    event.preventDefault();

    navigate('/update_profile');
  };


  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <h4>Profile Information</h4>
      <p>Name: {UserInfo.name}</p>
      <p>Code: {UserInfo.code}</p>
      <p>Email: {UserInfo.email}</p>
      <p>UserType: {UserInfo.account_level}</p>

      <Button variant="primary" onClick={handleProfileUpdate}>
      Update Profile
    </Button>

    </div>
  );
}

export default Home;
