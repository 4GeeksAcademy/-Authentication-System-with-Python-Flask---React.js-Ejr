import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css"
import { Context } from "../store/appContext";


export const Register = () => {
    const { store, actions } = useContext(Context);

    return (
        <div class="container login-container">
            <div class="row login-row">
                <div class="col-md-6 login-form-1">
                    <h3>Registro</h3>

                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Name" />
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Email" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Your Password" />
                    </div>
                    <div class="form-group">
                        <Link to="/demo">
                        <input type="submit" class="btnSubmit" value="Registrer" />
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