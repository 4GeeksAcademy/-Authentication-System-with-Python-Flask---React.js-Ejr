import React, { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("555-555-5555");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // save the profile information and photo to the server
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

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(file);
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ color: "white" }}>
      {isEditing ? (
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Phone:
            <input type="tel" value={phone} onChange={handlePhoneChange} />
          </label>
          <br />
          <label>
            Photo:
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
          <br />
          {photoPreview && <img src={photoPreview} alt="Profile" />}
          <br />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          {photoPreview && <img src={photoPreview} alt="Profile" />}
          <br />
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
