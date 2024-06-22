import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { updateProfile } from "../common/ApiClient";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import Swal from 'sweetalert2';

function ProfilePage({ isLoggedIn, UserInfo }) {
  const [message, setMessage] = useState("");
  const [ShowUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
    setShowUpdate(!!storedToken);
  }, [storedToken]);

  const processUpdate = async (data) => {
    Swal.showLoading();
    data["id"] = UserInfo["id"];
    const { response } = await updateProfile(data);
    
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  console.log(UserInfo);
  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col sm={6}>
          {storedToken && (
            <>
              <h2>Update Profile</h2>
              <ProfileForm processUpdate={processUpdate} UserInfo={UserInfo} />
              {message && <p className="mt-3 text-danger">{message}</p>}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
