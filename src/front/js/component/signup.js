import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [profileName, setprofileName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const onSignUpClick = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Here you would usually send a request to your backend to create the new user
    const response = await fetch(`${process.env.BACKEND_URL}/api/sign-up`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      // Redirect to login or directly log the user in
      navigate('/login'); // Redirect to login page after successful signup
    } else {
      // Handle unsuccessful signup attempts here
      setMessage("Signup failed, please try again.");
    }
  };

  return (
    <div className='mx-5 px-5'>
      <h4 className="m-1 p-2 border-bottom">Sign Up</h4>
      {/* Name Field */}
      <div className="form-group form-row">
        <label className="col-lg-4">Name:</label>
        <input
          type="text"
          className="form-control"
          value={profileName}
          onChange={(event) => setprofileName(event.target.value)}
        />
      </div>
      {/* Username Field */}
      <div className="form-group form-row">
        <label className="col-lg-4">Username:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      {/* Email Field */}
      <div className="form-group form-row">
        <label className="col-lg-4">Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      {/* Password Field */}
      <div className="form-group form-row">
        <label className="col-lg-4">Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {/* Confirm Password Field */}
      <div className="form-group form-row">
        <label className="col-lg-4">Confirm Password:</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>
      {/* Message Display */}
      <div>{message}</div>
      {/* Sign Up Button */}
      <div className="text-end p-3">
        <button className="btn btn-primary" onClick={onSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
