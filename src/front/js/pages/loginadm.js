import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Loginadm = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false); // Si no contiene datos
    const handleClick = (e) => {
        e.preventDefault()
        if (email == "" || password == "") {
            setAlert(true)
        }
        if (email != "" && password != "") {

            actions.Login(email, password)
        }

    };

    return (
        

            <div class=" jijo" onclick="onclick">
                <div class="top"></div>
                <div class="bottom"></div>
                <div class="center">
                    <h2>Please Sign In</h2>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <h2>&nbsp;</h2>
                    <Link to="/">
                            <i className="fa-solid  fa-house"></i>
                        </Link>
                </div>
            </div>
        

    );
};

