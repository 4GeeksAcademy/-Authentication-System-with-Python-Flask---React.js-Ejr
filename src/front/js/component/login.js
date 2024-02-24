import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ setAuthAttempt }) => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const onLoginClick = async () => {
    console.log(email, password);
    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("token", data.access_token);
      setAuthAttempt("made");

      navigate('/profile'); // Navigate to the 'favorite' page on successful login
    } else {
      // Handle unsuccessful login attempts here, maybe set a message to display to the user
      setMessage(<span className="text-danger">Invalid login, please try again.</span>);
    }
  };

  return (
    <div className='mx-5 px-5'>
      <h4 className="m-1 p-2 border-bottom">Login</h4>
      {/* Email Starts */}
      <div className="form-group form-row">
        <label className="col-lg-4">Email:</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      {/* Email Ends */}
      {/* Password Starts */}
      <div className="form-group form-row">
        <label className="col-lg-4">Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {/* Password Ends */}
      <div className="row">
          <div className='col p-3'>
            {/* <Link> */}
              <p className="">
                Sign Up
              </p> 
            {/* </Link */}
          </div>
      <div className="col text-end p-3">
        {message}
        <button className="btn btn-primary" onClick={onLoginClick}>
          Login
        </button>
      </div>
      </div>
    </div>
  );
};

export default Login;






















