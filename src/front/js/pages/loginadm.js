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
                <h2>Admin Space</h2>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input

                    onClick={(e) => { handleClick(e) }}

                    type="submit"
                    class="btnSubmit"
                    value="Login"
                />
                {alert && <div class="alert alert-danger" id="alertSI" role="alert">
                    Completa datos
                </div>}
                <h2>&nbsp;</h2>
                <Link to="/">
                    <i className="fa-solid  fa-house"></i>
                </Link>
            </div>
        </div>


    );
};

