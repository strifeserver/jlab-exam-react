import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { validateToken } from "../common/ApiClient";
import Swal from 'sweetalert2';
function Home({ isLoggedIn, UserInfo }) {
  const navigate = useNavigate(); 



  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if(!!!storedToken){
      Swal.showLoading();
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [storedToken, isLoggedIn]); 


  const handleProfileUpdate = (event) => {
    event.preventDefault();

    navigate('/update_profile');
  };

  Swal.close()
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
