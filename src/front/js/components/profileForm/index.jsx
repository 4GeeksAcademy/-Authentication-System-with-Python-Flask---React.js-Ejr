import React, { useState } from "react";
import Input from "../input/index.jsx";
export const ProfileForm = ({ handleChange, handleClick }) => {
  return (
    <div>
      <form onChange={handleChange} onSubmit={handleClick}>
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="Username"
          name="username"
          value="username"
        />
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="First name"
          name="firstname"
          value="firstname"
        />
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="Last name"
          name="lastname"
          value="lastname"
        />
        <Input
          icon={<i className="fa-solid fa-envelope"></i>}
          type="email"
          placeholder="Email"
          name="email"
          value="emails"
        />
        <button type="submit" className="submitBtn boxShadow">
          Update
        </button>
      </form>
    </div>
  );
};
