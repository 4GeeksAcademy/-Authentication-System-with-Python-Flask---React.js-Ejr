import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/create_account.css";

export const CreateAccount = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex justify-content-center">
            <div className="createaccountform col-md-6">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label" for="autoSizingInputGroup">Choose Your Username</label>
                        <div className="input-group">
                        <div className="input-group-text">@</div>
                        <input type="text" className="form-control" id="autoSizingInputGroup" placeholder="Username" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="formFile" className="form-label">Choose your profile photo</label>
                        <input className="form-control" type="file" id="formFile" />
                    </div>
                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" />
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                    </div>

                    <div className="col-12">
                        <label for="form-check" className="form-label">Choose your privacy</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                            <label className="form-check-label" for="flexRadioDefault2">
                                Public Profile
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" for="flexRadioDefault1">
                                Private Profile
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" for="gridCheck">
                            I accept the privacy policy
                        </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn createaccountbtn">Create Account</button>
                    </div>
                </form>
            </div>
		</div>
	);
};

export default CreateAccount; 