import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
const Login = () => {
  const {store,actions} = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const onLoginClick = async (email, password) => {
    console.log(email, password)
      const response = await fetch(`${process.env.BACKEND_URL}/login`, 
      { method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password})});
      if (response.ok){
        const data = await response.json()
        store.token = data.access_token
        console.log(store.token)
      }
      // const body = await response.json();
      // console.log(body);
    //   if (body.length > 0) {
    //     // Success
    //     setMessage(<span className="text-success">Successfully logged in</span>);
    //   } else {
    //     // Error
    //     setMessage(<span className="text-danger">Invalid login, please try again.</span>);
    //   }
    // } catch (error) {
    //   console.error('Login error:', error);
    //   setMessage(<span className="text-danger">An error occurred during login.</span>);
    // }
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
      <div className="text-end p-3">
        {message}
        <button className="btn btn-primary" onClick={() => onLoginClick(email, password)}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;





















