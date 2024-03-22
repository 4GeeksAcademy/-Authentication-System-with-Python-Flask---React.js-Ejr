import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
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

    const handleClick = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      navigate("/login"); // Directly navigate to check if navigation works
  };
  

    return (
        <div>
            <form onSubmit={handleClick}>
                <h1>Sign up</h1>
                <input
                    type="text"
                    placeholder="Email"
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
                {error && <div>{error}</div>} {/* Display any signup errors */}
                <Link to="/forgot">Forgot Password</Link>
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
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </div>
            </div>
        </div>
    );
};