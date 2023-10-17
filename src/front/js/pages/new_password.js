import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useSearchParams } from "react-router-dom";
import bookswaplogo from "../../img/logo-final-project.png";
import "../../styles/forms.css";

export const NewPassword = () => {
    const { store, actions } = useContext(Context);
    const [searchParams] = useSearchParams();

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");


    const resetPassword = (e) => {
        e.preventDefault();
        const token = searchParams.get('token');
        if (!token) alert("We cannot reset the password");

        else if (password !== confirm) alert("Carefull! The passwords don't match.");
        else {
            actions.resetPassword(token, password, alert);
        }

    }

    return (

        <div className="container text-center">
            <h1>Reset Your Password</h1>
            <div className="row justify-content-center">
                <div className="createaccountform col-md-6">
                    <form className="row g-3 text-start" onSubmit={resetPassword}>
                        <div className="col-12">
                            <label for="password" className="form-label">New password</label>
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="password" />
                        </div>

                        <div className="col-12">
                            <label for="confirm" className="form-label">Confirm new password</label>
                            <input type="password" className="form-control" onChange={(e) => setConfirm(e.target.value)} id="confirm" />
                        </div>

                        <div className="col-12 text-center">
                            <button type="submit" className="btn loginbtn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPassword; 
