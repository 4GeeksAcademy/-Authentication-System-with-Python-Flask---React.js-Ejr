import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import google from "../../img/googlelogin.png";

import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="back-texto2 p-5 h-auto ">
            <div className="cambria m-auto p-5 back-texto3" style={{width:"500px"}}>
                <h1 className="text-center">Login</h1>
                <form>
                    <p className="mb-0 login">Email:</p>
                    <input type="text" placeholder="example@gmail.com" className="w-100 mb-4 login"></input>
                    <p className="mb-0 login">Contraseña:</p>
                    <input type="password" className="mb-4 w-100 login"></input><br/>
                    <div className="text-center">
                    <button type="submit" className="login mb-3">Iniciar Sesion</button>
                    </div>
                </form>
                <p className="mb-0">¿No tienes Cuenta? <Link to="/register">Registrarse</Link></p>
                <p className="mb-0">¿Olvidaste la contraseña?</p>
                <p className="text-center">OR</p>
                <div className="text-center">
                    <img src={google} style={{width : "300px", height : "70px" }}/>
                </div>


            </div>
        </div>
    );
};
