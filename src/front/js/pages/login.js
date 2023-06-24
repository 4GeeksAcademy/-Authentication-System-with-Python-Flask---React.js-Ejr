import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eye, setEye] = useState(true);
    const navigate = useNavigate();
    const handleEmailChange = e => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await actions.bestLogin(email, password);
           navigate("/private");
        } catch (error) {
            console.log(error);
            navigate("/notfound");
        }
    };

    const handleEye = () => {
        if (eye == true) {
            setEye(false)
          
        }
        if (eye == false) {
            setEye(true)
        
        }
        
    };
  
    

    return (
        <div className="container text-center justify-content-center">
            <br />
            <h1>Acceso de Usuario</h1>
            <br />
            <br />
            <div>
                <div className="container wrapper d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="h4">Dirección de Correo</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Tu correo"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="h4">Contraseña</label>
                            <div className="d-flex">
                            <input
                                type={eye == false ? "text" : "password"}
                                className="form-control me-3"
                                id="exampleInputPassword1"
                                placeholder="Contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <i className={eye == true ? "fa-solid fa-eye-slash m-auto" : "fa-solid fa-eye m-auto"} onClick={handleEye}></i>
                            </div>
                            <small>¿No recuerdas tu contraseña? <Link to="/">Recuperar aquí</Link></small>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="container d-flex justify-content-center">
                    <h5>Si no te has registrado, puedes hacerlo <Link to="/login">Aquí</Link></h5>
                </div>
            </div>
        </div>
    );
}