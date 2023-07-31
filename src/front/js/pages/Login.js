import React, { useState } from 'react';
import axios from 'axios'; 
// import './Login.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (event) => { 
    event.preventDefault();
    setIsLoggingIn(true);
    
    try {
      
      const response = await axios.post('https://sblaise123-orange-guacamole-5wq5jw6967g37pq4-3001.preview.app.github.dev/login', {
        username,
        password
      });
      
      setIsLoggingIn(false);
      
      
      if (response.data.success) {
        alert(`Logged in successfully as ${username}`);
        
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setIsLoggingIn(false);
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoggingIn}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
            required
          />
        </div>
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};


// export default Login;







    
export default Login;

