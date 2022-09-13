import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css"
import { Context } from "../store/appContext";


export const Register = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const FuncionRegistro = () => {
      if (name != "" && email != "" && password != "") actions.Register(name, email, password); //
      else alert("Completar todos los campos");
    };

    return (
        <div class="container login-container">
            <div class="row login-row">
                <div class="col-md-6 login-form-1">
                    <h3>Registro</h3>

                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <Link to="/demo">
                        <input onClick={FuncionRegistro} type="submit" class="btnSubmit" value="Registrer" />
                        </Link>
                        
                    </div>
                    

                </div>
                <div class="col-md-6 login-form-2">
                    <div class="login-logo">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                    </div>


                </div>
            </div>
        </div>
    );
}