import React from "react";
import Input from "../input/index.jsx";
import Button from "../button/index.jsx";
import styles from "./profileForm.module.css";
const ProfileForm = ({ handleChange, handleClick, user }) => {
  return (
    <div>
      <form
        onChange={handleChange}
        onSubmit={handleClick}
        className={styles._form}
      >
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="Username"
          name="username"
          defaultValue={user?.username}
          required
        />
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="First name"
          name="firstname"
          defaultValue={user?.firstname}
          required
        />
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="Last name"
          name="lastname"
          defaultValue={user?.lastname}
          required
        /> 
        <Input
          icon={<i className="fa-solid fa-envelope"></i>}
          type="email"
          placeholder="Email"
          name="email"
          defaultValue={user?.email}
          required
        />
        <Button type="submit" title="Update" />
      </form>
    </div>
  );
};

export default ProfileForm;
