import React from "react";
import { Link } from "react-router-dom";
import logoecasa from "../../img/logoe-casa.png"
import googleLogo from "../../img/logo-google.png"

export const Login = () => {
    return (
        <>
        <div className="d-flex justify-content-center">
            <img src={logoecasa} alt=":C" style={{width: "55px"}}/>
        </div>
            <p id="emailHelp" className="d-flex justify-content-center my-3">E-CASA</p>
        <form className="container my-5">
            <h1>Entrar</h1>
                <p id="emailHelp" className="form-text my-3">Hola! Qué gusto verte</p>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label texto-amarillo">Email address</label>
                <input type="email" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label texto-amarillo">Password</label>
                <input type="password" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 form-check">
            </div>
            <button type="submit" className="btn text-white bg-azul-oscuro col-12 mx-auto">Entrar</button>
        </form>
        <div className="container">
            <p id="emailHelp" className="form-text my-3 d-flex justify-content-center">iniciar con Google</p>
            <button type="submit" className="btn borde-azul-oscuro col-12 mx-auto border-2 rounded-pill"><img src={googleLogo} alt=":C" style={{width: "30px"}}/></button>
        </div>
        <div className="d-flex form-text my-4 justify-content-between container">
            <p id="emailHelp">Olvidaste tu contraseña?</p>
            <Link to={"/signup"}><p className="texto-amarillo">Regístrate</p></Link>
        </div>
        </>
    );
};