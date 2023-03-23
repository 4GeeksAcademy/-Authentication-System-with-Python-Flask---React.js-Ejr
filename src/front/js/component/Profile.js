import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("555-555-5555");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  return (
    <Container style={{ color: "white" }}>
      <Row className="mb-4 justify-content-center">
        <Col>
          <h1>Profile</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          {isEditing ? (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                />
              </Form.Group>

              <Form.Group controlId="formBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={bio}
                  onChange={handleBioChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleSaveClick}>
                Save
              </Button>
            </Form>
          ) : (
            <div>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
              <p>Address: {address}</p>
              <p>Bio: {bio}</p>
              <Button onClick={handleEditClick}>Edit</Button>
            </div>
          )}
        </Col>
        <Col md={6}>
          <div className="text-center">
            <img
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : "default-image-url"
              }
              alt="Profile"
              className="rounded-circle"
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
            <br />
            <br />
            <Button variant="primary">
              <input type="file" onChange={handleProfilePictureChange} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
