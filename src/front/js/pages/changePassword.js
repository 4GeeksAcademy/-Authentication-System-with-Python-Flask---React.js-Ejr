import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const ChangePassword = () => {
    const { store, actions } = useContext(Context);
    const [error, setError] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShowneye, setPasswordShowneye] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();

    //   // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
        setPasswordShowneye(!passwordShowneye)
    };

    async function submitForm(e) {
        e.preventDefault()
        let data = new FormData(e.target)
        if (data.get("password") != data.get("passwordConfirm")) {
            setError(true)
            console.log("Claves no coinciden")
        }
        else {
            setError(false)
        }
        let tokenPassword = searchParams.get("token")
        let resp = await actions.changePasswordRecovery(tokenPassword, data.get("password"))
        if (resp >= 400) {
            return
        }
        console.log("Clave cambiada")
    }

    return (
        <div className="container">
            {error && (
                <div className="alert alert-danger" role="alert">
                    Passwords do not match!
                </div>
            )}
            <h3>Change password</h3>
            <form onSubmit={submitForm}>
                <div className="form-group mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                        <input type={passwordShown ? "text" : "password"} className="form-control" name="password" />
                        <button onClick={togglePassword} className="input-group-text">
                            <i className={passwordShowneye ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                        </button>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Password Confirm</label>
                    <div className="input-group">
                        <input type={passwordShown ? "text" : "password"} className="form-control" name="passwordConfirm" />
                        <button onClick={togglePassword} className="input-group-text">
                            <i className={passwordShowneye ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                        </button>
                    </div>
                </div>

                <div className="col-12 mb-3 ">
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary  mx-1" type="submit">Recovery</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
