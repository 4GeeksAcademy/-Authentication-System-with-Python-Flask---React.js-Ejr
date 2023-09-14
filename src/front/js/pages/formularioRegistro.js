import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import { Context } from "../store/appContext";

export const FormularioRegistro = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        actions.vistaRegistro()

    }, [])

    return (
        <div className="container col-md-4 my-3 shadow p-0">
            <form className="form-control shadow p-3 " onSubmit={(e) => actions.submitRegister(e, navigate)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa tu nombre"
                        maxLength="12"
                        minLength="3"
                        required
                    //onChange={}
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Apellido
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa tu apellido"
                        maxLength="12"
                        minLength="3"
                        required
                    //onChange={}
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa tu email"
                        required
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    //onChange={}
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="re_password"
                        placeholder="Contraseña"
                        required
                        name={'re_password'}
                    //onChange={}
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Repetir Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="re_password"
                        placeholder="Repita contraseña"
                        required
                        name={'repetir_password'}
                    //onChange={}
                    />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">
                        Region
                    </label>
                    <select className="form-select" required >
                        <option value="" >Selecciona region...</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                    </select>
                </div>
                <div className="my-3 form-check">
                    <input type="checkbox"
                        className="form-check-input"
                        id="Check1" required
                    //onChange={}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Acepto términos y condiciones
                    </label>
                </div>
                <button type="submit" className="btn btn-primary my-3">
                    Registrarse
                </button>
            </form>
        </div>
    );
};