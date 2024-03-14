import React, { useState, useContext } from "react";
import "../../styles/loginpage.css";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {  
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  console.log(token);
  const handleSubmit = (e) => {
    e.preventDefault();
    actions
      .login(email, password)
      .then((res) => navigate("/profile"))
      .catch((err) => setError(err));
    // Submit email/password here
  };

 
    return (
      <form onSubmit={handleSubmit}>
        <h1 className="">Login</h1>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text" 
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <button>
          <Link to="/forgot">Forgot Password</Link>
        </button>
      </form>
    );
}