import React, { useState } from "react";

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState("");




  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
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

    // Here you can perform the login logic, such as making an API request

    // Reset the form fields after submission
    setUsername("");
    setEmail("");
    setPassword("");
    setFirstname("");

  };

  return (
    <div>
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
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
};

export default CreateAccount;
