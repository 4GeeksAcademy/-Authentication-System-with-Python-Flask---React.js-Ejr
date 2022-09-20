import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [token, setToken] = useState(localStorage.getItem("token"));

    const handleClick = () => {
        if (email != "" && password != "") actions.Login(email, password);
        else return

    };
 
    return (
        <div class="container login-container" >
            <div class="row login-row" >
                <div class="col-md-6 login-form-1" id="form1">
                    <h3>Login Here</h3>

                    <form class="form-group">
                        <input
                            id="user"
                            type="text"
                            class="form-control"
                            placeholder="Your Email *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    <div class="form-group">
                        <input
                            id="pass"
                            type="password"
                            class="form-control"
                            placeholder="Your Password *"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div class="form-group" >
                        <input
                            
                            onClick={handleClick}
                            type="submit"
                            class="btnSubmit"
                            value="Login"
                            />
                        <Link to="/register">
                            
                            <input type="submit" class="btnSubmit" value="Register" />
                        </Link>
                         <div id="alertSI" class="alert alert-success alert-dismissible fade show" role="alert">Login ¡OK!</div>
                         <div id="alertNO" class="alert alert-danger" role="alert">Complete los datos</div>         
                        
                    </div>
                    </form>
                    <div class="form-group">
                        <a href="#" class="btnForgetPwd">
                            Forget Password?
                        </a>
                    </div>
                </div>
                <div class="col-md-6 login-form-2">
                    <div class="login-logo">
                        <Link to="/">
                            <i className="fa-solid  fa-house icon-house"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

