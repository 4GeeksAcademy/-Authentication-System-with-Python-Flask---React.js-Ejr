import React, { useContext } from "react";
import { Context } from "../store/appContext";
import bookswaplogo from "../../img/logo-final-project.png";
import "../../styles/forms.css";


export const Reset = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
            <h1>Reset Your Password</h1>
            <div className="row justify-content-center">
                <div className="createaccountform col-md-6">
                    <form className="row g-3 text-start">
                        <div className="col-12">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" />
                        </div>
                        <div className="col-12">
                            <label for="newPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="newPassword" />
                        </div>

                        <div className="col-12 text-center">
                            <button type="submit" className="btn loginbtn">Update</button>
                        </div>
                    </form>
                </div>
            </div>
		</div>
	);
};

export default Reset; 
