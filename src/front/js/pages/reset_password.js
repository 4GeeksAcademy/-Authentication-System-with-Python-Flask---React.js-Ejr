import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import bookswaplogo from "../../img/logo-final-project.png";
import "../../styles/forms.css";


export const Reset = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");

    const resetPassword = (e) => {
        e.preventDefault();

        actions.sendForgotPasswordEmail(email, alert);
    }

    return (
        <div className="container text-center">
            <h1>Reset Your Password</h1>
            <div className="row justify-content-center">
                <div className="createaccountform col-md-6">
                    <form className="row g-3 text-start" onSubmit={resetPassword}>
                        <div className="col-12">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" onChange={(e) => setEmail(e.target.value)} />
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

export default Reset; 
