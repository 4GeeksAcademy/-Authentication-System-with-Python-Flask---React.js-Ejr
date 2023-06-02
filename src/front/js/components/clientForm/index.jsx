import React from "react";
import Input from "../../components/input/index.jsx";

const ClientForm = ({ handleChange, handleSubmit }) => {
  return (
    <form>
      <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Name"
        name="name"
      />
      <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Last Name"
        name="lastname"
      />
      <Input
        icon={<i className="fa-solid fa-envelope"></i>}
        type="textarea"
        placeholder="Email"
        name="email"
      />
      <Input
        icon={<i className="fa-solid fa-phone"></i>}
        type="text"
        placeholder="Phone Number"
        name="phone"
      />
      <button type="submit" className="submitBtn boxShadow">
        Submit
      </button>
    </form>
  );
};

export default ClientForm;
