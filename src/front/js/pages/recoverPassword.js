import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const RecoverPassword = () => {
	const { store, actions } = useContext(Context);
	async function submitForm(e){
        e.preventDefault()
        let data = new FormData(e.target)
        let resp = await actions.requestPasswordRecovery(data.get("email"))
        if (resp>=400){
            return 
        }
        console.log("Login exitoso")
    }

	return (
		<div className="text-center mt-5">
			<h1>Recover password</h1>
			<form onSubmit = {submitForm}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail" className="form-label">Email address</label>
					<input type="email" className="form-control" name="email" id="exampleInputEmail" aria-describedby="emailHelp" />
					<div id="emailHelp" className="form-text" >We'll never share your email with anyone else</div>
				</div>
				<button type="submit" className="btn btn-primary">Request Recovery</button>
			</form>
		</div>
	);
};
