import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";

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
    <Container>
      <Row className="justify-content-center mt-4 mb-4">
        <Col>
          <h1>Profile</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Profile Information</Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <div className="text-center">
                    <img
                      src={
                        profilePicture
                          ? URL.createObjectURL(profilePicture)
                          : "https://via.placeholder.com/200x200.png?text=Profile+Picture"
                      }
                      alt="Profile"
                      className="rounded-circle mb-3"
                      style={{ maxHeight: "200px", maxWidth: "200px" }}
                    />
                    <br />
                    <Form.Group controlId="formProfilePicture">
                      <Form.Label htmlFor="profilePictureUpload" className="d-none">
                        Change Profile Picture
                      </Form.Label>
                      <Form.Control
                        id="profilePictureUpload"
                        type="file"
                        onChange={handleProfilePictureChange}
                        style={{ display: "none" }}
                      />
                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          document.getElementById("profilePictureUpload").click()
                        }
                      >
                        Change Profile Picture
                      </Button>
                    </Form.Group>
                  </div>
                </Col>
                <Col md={8}>
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

                  <Button variant="outline-primary" onClick={handleSaveClick}>
                    Save
                  </Button>
                </Form>
              ) : (
                <>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Name:</strong> {name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Email:</strong> {email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Phone:</strong> {phone}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Address:</strong> {address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Bio:</strong>
                      <br /> {bio}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    className="mt-3"
                    variant="outline-primary"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
);
};

export default Profile;