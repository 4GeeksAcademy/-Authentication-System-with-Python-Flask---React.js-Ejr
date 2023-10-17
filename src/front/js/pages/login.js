import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import bookswaplogo from "../../img/logo-final-project.png";
import "../../styles/forms.css";
import { Navigate } from "react-router-dom"


export const Login = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginFunction = (e) => {
        e.preventDefault();
        
        actions.login(email, password);
        
    }
   
    return (
        actions.isLoggedIn() ? (
            <Navigate
            to="/PublicProfile"
          />
        ) : 
        <div className="container text-center">
            <img src={bookswaplogo} alt="bookswap" height="100" />
            <div className="row justify-content-center">
                <div className="createaccountform col-md-6">
                    <form className="row g-3 text-start" onSubmit={loginFunction}>
                        <div className="col-12">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />
                        </div>

                        <div className="col-md-12">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" required />
                        </div>

                        <div className="col-12 text-center">
                            <button type="submit" className="btn loginbtn">Log in</button>
                            <div className="container mt-3">
                                <a href="/reset-password">Forgot your password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login; 