import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Moviestar from "../../img/Moviestar.png";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";


export const PassRecovery = () => {
	const { store, actions } = useContext(Context);

    const [form, setForm] = React.useState({ email: "", secret_answer: ""})
    const navigate = useNavigate

    const handleChange = (e) => {
        const key = e.target.name 
        const value = e.target.value
        setForm(prev => ({ ...prev, [key]: value}))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const apiUrl = `${process.env.BACKEND_URL}api/pass-recovery`
        try {
            console.log(apiUrl,form)
            const res = await fetch(apiUrl, {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            console.log(data)
            navigate("/pass-change")
        } catch (error) {
            console.error(error)
        }
    }

	return (
		<div className="text-center mt-5">
			<img id="image" src={Moviestar} />
		<form onSubmit={onSubmit}>
            <div>
                <input className="text-center" name="email" onChange={handleChange} type="text" id="username1" placeholder="Email" value={form.email} required></input>
            </div>
            <br/>
            <div>
                <input className="text-center" name="secret_answer" onChange={handleChange} type="password" id="secret_answer" placeholder="Secret Answer" value={form.secret_answer} required></input>
                <br/>
            </div>
			<br/>
            <button type="submit" id="recovery-button">Send</button>
            <br/>
        </form>
		</div>
	);
};
