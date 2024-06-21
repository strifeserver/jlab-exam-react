import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { updateProfile } from "../common/ApiClient";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";

function ProfilePage({ isLoggedIn, UserInfo }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       setTimeout(() => {
  //         navigate("/home");
  //       }, 1000);
  //     }
  //   }, [isLoggedIn, navigate]);

  const processUpdate = async (data) => {
    data["id"] = UserInfo["id"];
    const { response } = await updateProfile(data);
        setTimeout(() => {
          navigate("/home");
        }, 1000);


  };
  console.log(UserInfo);
  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col sm={6}>
          {isLoggedIn ? (
            <>
              <h2>Update Profile</h2>
              <ProfileForm processUpdate={processUpdate} UserInfo={UserInfo} />
              {message && <p className="mt-3 text-danger">{message}</p>}
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
