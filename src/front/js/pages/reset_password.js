import React, { useContext } from "react";
import { Context } from "../store/appContext";
import bookswaplogo from "../../img/logo-final-project.png";
import "../../styles/forms.css";


export const Reset = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex justify-content-center">
            <div className="container justify-content-center">
                <img src={bookswaplogo} alt="bookswap" height="200" />
            </div>
            <div className="createaccountform col-md-6">
                <form className="row g-3">
                    <div className="col-12">
                        <label className="form-label" for="autoSizingInputGroup">Username</label>
                        <div className="input-group">
                        <div className="input-group-text">@</div>
                        <input type="text" className="form-control" id="autoSizingInputGroup" placeholder="Username" />
                        </div>
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
	);
};

export default Reset; 
