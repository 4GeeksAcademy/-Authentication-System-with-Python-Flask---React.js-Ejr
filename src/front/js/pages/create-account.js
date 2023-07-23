import React, { useState,useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";


export default function CreateAccount() {

  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const navigate = useNavigate();
  console.log("Password", password, "Email:", email);

  const registerUser = async () => {
     const response = await fetch(
       `${process.env.BACKEND_URL}/signup`,
      {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
      },
         body: JSON.stringify({
           email: email,
           password: password,
           firstname: firstname,
           phonenumber: phonenumber

         }),
      }
     );
     const data = await response.json();
     if (response.ok) {
       navigate('/login');
     } else {
       console.log("Error:", data);
     }
   };





  const handlePhonenumberChange = (event) => {
    setPhonenumber(event.target.value);
  };


  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser()
    // Here you can perform the login logic, such as making an API request

    // Reset the form fields after submission
    setPhonenumber("");
    setEmail("");
    setPassword("");
    setFirstname("");

  };

  return (
    <div>
    <h2>Sign Up</h2>
    <form>
      <input
        type="text"
        placeholder="Phonenumber"
        value={phonenumber}
        onChange={handlePhonenumberChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
       <input
        type="text"
        placeholder="Firstname"
        value={firstname}
        onChange={handleFirstnameChange}
      />


      <button type="submit">Sign Up</button>
    </form>
  </div>
);


}
