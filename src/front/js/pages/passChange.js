import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Moviestar from "../../img/Moviestar.png";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";


export const PassChange = () => {
	const { store, actions } = useContext(Context);

    const [form, setForm] = React.useState({ new_password: "", confirm_password: ""})
    const navigate = useNavigate

    const handleChange = (e) => {
        const key = e.target.name 
        const value = e.target.value
        setForm(prev => ({ ...prev, [key]: value}))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const apiUrl = `${process.env.BACKEND_URL}api/pass-change`
        try {
            console.log(apiUrl,form)
            const res = await fetch(apiUrl, {
                method:"PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            console.log("su contraseña se modificó correctamente")
            navigate("/")
        } catch (error) {
            console.error("Las contraseñas no coinciden")
        }
    }

	return (
		<div className="text-center mt-5">
			<img id="image" src={Moviestar} />
		<form onSubmit={onSubmit}>
            <div>
                <input className="text-center" name="new_password" onChange={handleChange} type="password" id="new_password" placeholder="Nueva contraseña" value={form.new_password} required></input>
            </div>
            <br/>
            <div>
                <input className="text-center" name="confirm_password" onChange={handleChange} type="password" id="confirm_password" placeholder="Confirmar contraseña" value={form.confirm_password} required></input>
                <br/>
            </div>
			<br/>
            <button type="submit" id="recovery-button">Confirmar</button>
            <br/>
            </form>
            </div>
    );
};


