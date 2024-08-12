import React, { useState } from "react";
import "../../styles/singup.css";

const Signup = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPartner, setIsPartner] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleToggleChange = () => {
        setIsPartner(!isPartner);
    };

    return (
        <div className="singup-body">
            <div className={`singup-container ${isActive ? "singup-active" : ""}`} id="container">
                <div className="singup-form-container singup-sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <div className="signup-toggle-wrapper">
                            <button type="submit">Sign Up</button>
                            <label className="switch">
                                <input type="checkbox" checked={isPartner} onChange={handleToggleChange} />
                                <span className="slider round"></span>
                            </label>
                            <span className="toggle-text">{isPartner ? "Partner" : "Usuario"}</span>
                        </div>
                    </form>
                </div>
                <div className="singup-form-container singup-sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <span>Use your email and password</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forget Your Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="singup-toggle-container">
                    <div className="singup-toggle">
                        <div className="singup-toggle-panel singup-toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="singup-hidden" id="login" onClick={handleLoginClick}>
                                Sign In
                            </button>
                        </div>
                        <div className="singup-toggle-panel singup-toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="singup-hidden" id="register" onClick={handleRegisterClick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;