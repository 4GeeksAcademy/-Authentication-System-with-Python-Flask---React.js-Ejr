import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/create_account.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex justify-content-center">
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
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" for="gridCheck">
                            Remember me
                        </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn createaccountbtn">Create Account</button>
                        <div className="container">
                            <a href="#">Forfot your password?</a>
                        </div>
                    </div>
                </form>
            </div>
		</div>
	);
};

export default Login; 
