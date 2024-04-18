import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import google from "../../img/googlelogin.png";

import { Context } from "../store/appContext";

export const Register = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="back-texto2 p-5 h-auto ">
            <div className="cambria m-auto p-5 back-texto3" style={{width:"500px", height: "670px"}}>
                <h1 className="text-center mb-3">Registrarse</h1>
                <form className="mb-2">
                    <p className="mb-0 login">Email:</p>
                    <input type="text" placeholder="ejemplo@gmail.com" className="w-100 mb-4 login"></input>
                    <p className="mb-0 login">Nombre de Usuario:</p>
                    <input type="text" className="w-100 mb-4 login"></input>
                    <p className="mb-0 login">Contraseña:</p>
                    <input type="password" className="mb-4 w-100 login"></input><br/>
                    <div className="text-center">
                    <button type="submit" className="login mb-3">Regístrate</button>
                    </div>
                </form>
                <p className="mb-0">¿Ya tienes una cuenta? <Link to="/login">Login</Link></p>
                <p className="text-center mb-2">OR</p>
                <div className="text-center">
                    <img src={google} style={{width : "300px", height : "70px" }}/>
                </div>


            </div>
        </div>
    );
};