import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Moviestar from "../../img/Moviestar.png";
import "../../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {
	const { store, actions } = useContext(Context);

    const [form, setForm] = React.useState({ email: "", password: ""})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const key = e.target.name 
        const value = e.target.value
        setForm(prev => ({ ...prev, [key]: value}))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const login = await actions.login(form)
        if (login === true){navigate("/")} 
    }
    // useEffect(() => {
    //     console.log(store.logged)
    // }, []);

	return (
		<div className="text-center mt-5">
			<img id="image" src={Moviestar} />
		<form onSubmit={onSubmit}>
            <div>
                <input className="text-center" name="email" onChange={handleChange} type="text" id="username1" placeholder="Usuario" value={form.email} required></input>
            </div>
            <br/>
            <div>
                <input className="text-center" name="password" onChange={handleChange} type="password" id="password1" placeholder="Contraseña" value={form.password} required></input>
                <br/>
                <Link to={"/pass-recovery"} id="ps" href="#aja">Restore password</Link>
            </div>
			<br/>
            <button type="submit" id="login-button">Login</button>
            <br/>
            <div class="text-center d-flex justify-content-center">
                <p>You do not have an account?</p>
                <Link to={"/sign-up"} id="sp" class="register-link">  Register</Link>
            </div>
        </form>
		</div>
	);
};