import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import Moviestar from "../../img/Moviestar.png";
import { useNavigate } from "react-router-dom";


export const PassChange = () => {
	const { store, actions } = useContext(Context);

    const [form, setForm] = React.useState({ new_password: "", confirm_password: ""})
    const navigate = useNavigate();

    const handleChange = (e) => {
        const key = e.target.name 
        const value = e.target.value
        setForm(prev => ({ ...prev, [key]: value}))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const passchange = await actions.passchange(form)
        if (passchange === true){
            navigate("/")
        }
       
    }

	return (
		<div className="text-center mt-5">
			<img id="image" src={Moviestar} />
		<form onSubmit={onSubmit}>
            <div>
                <input className="text-center" name="new_password" onChange={handleChange} type="password" id="new_password" placeholder="New Password" value={form.new_password} required></input>
            </div>
            <br/>
            <div>
                <input className="text-center" name="confirm_password" onChange={handleChange} type="password" id="confirm_password" placeholder="Confirm Password" value={form.confirm_password} required></input>
                <br/>
            </div>
			<br/>
            <button type="submit" id="recovery-button">Confirm</button>
            <br/>
            </form>
            </div>
    );
};


