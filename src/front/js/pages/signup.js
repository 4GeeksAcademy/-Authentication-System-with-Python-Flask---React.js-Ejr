import React, { useState, useContext } from "react";
// import "../../styles/signup.css";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";


export default function Signup() {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [preference, setPreference] = useState('');
  const [rememberPreference, setRememberPreference] = useState(false);
   
  const handlePreferenceChange = (event) => {
    setPreference(event.target.value);
  };

  const handleRememberPreferenceChange = (event) => {
    setRememberPreference(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Form submitted!');
  };

  const token = sessionStorage.getItem("token");
  console.log(token);
  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target);
    actions.signUp({name, email, password},navigate).then((res) => navigate("/login")).catch((err) => setError(err));
  }

    return (
      <div>
        <form onSubmit={handleClick}>
        <h1>Sign up</h1>
        <input
          type={"text"}
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
        <button>
          <Link to="/forgot">Forgot Password</Link>
        </button>
      </form>
      
       
      <div className="form-row align-items-center">
        <div className="col-auto my-1">
          <label className="mr-sm-2 sr-only" htmlFor="inlineFormCustomSelect">Preference</label>
          <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={preference} onChange={handlePreferenceChange}>
            <option value="">Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-auto my-1">
          <div className="custom-control custom-checkbox mr-sm-2">
            <input type="checkbox" className="custom-control-input" id="customControlAutosizing" checked={rememberPreference} onChange={handleRememberPreferenceChange} />
            <label className="custom-control-label" htmlFor="customControlAutosizing">Remember my preference</label>
          </div>
        </div>
        <div className="col-auto my-1">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
      
    </div>

  );
};
      
    