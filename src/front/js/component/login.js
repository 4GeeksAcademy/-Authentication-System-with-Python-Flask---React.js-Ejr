// Login.js
import React, { useState } from "react";
import Modal from "react-modal";
import "../../styles/login.css";

function Login({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here

    // Close the modal
    handleClose();
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel="Login Modal"
    >
      <h2 >Login</h2>
      
        <form>
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button
          type="button"
          onClick={handleLogin}
          className="modal-button"
        >
          Login
        </button>
      </form>
    </Modal>
  );
}

export default Login;
