import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/SignIn.css";
import Moviestar from "../../img/Moviestar.png";
import { useNavigate } from "react-router-dom";


export const SignIn = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        secret_answer: '',
        secret_question: '',
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const apiUrl = `${process.env.BACKEND_URL}api/sign-ºup`
        console.log(user)
        try {
            const res = await fetch(apiUrl, {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })
            console.log("Response status:", res.status);
            const data = await res.json();
            console.log("Response data:", data);
    
            if (res.ok) {
                localStorage.setItem("token", data?.token);
                navigate("/");
            } else {
                console.error("Request was not successful:", data);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }

    }
    return (
        <div className="text-center mt-5">
            <div>
                <img id="mo" src={Moviestar} />
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" name="name" onChange={handleChange} value={user.name} placeholder="Nombre de usuario" required />
                </label>
                <label>
                    <input type="email" name="email" onChange={handleChange} value={user.email} placeholder="Email" required />
                </label>
                <label>
                    <input type="password" name="password" onChange={handleChange} value={user.password} placeholder="Contraseña" required />
                </label>
                <label>
                <input type="password" name="confirm_password" onChange={handleChange} value={user.confirm_password} placeholder="Confirmar Contraseña" required />
                </label>
                <label>

                <input type="text" name="secret_question" onChange={handleChange} value={user.secret_question} placeholder="Pregunta Secreta" required />
                </label>
                <label>
                <input type="text" name="secret_answer" onChange={handleChange} value={user.secret_answer} placeholder="Respuesta Secreta" required />

                </label>
                <button type="submit">Registrate</button>
                <p>¿Ya tienes una cuenta?, <Link to="/login" className="login-link">Login</Link></p>
            </form>
        </div>
    );
}

// export default SignIn;
