import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/register.css";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password,
        };

        const url = process.env.BACKEND_URL; // Obtener la URL de la variable de entorno

        fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Manejar la respuesta de la API
            })
            .catch(error => {
                console.error(error); // Manejar errores
            });
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleNameChange} required /><br /><br />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required /><br /><br />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required /><br /><br />

                <input type="submit" value="Sign Up" />
            </form>

            <Link to="/login">Login</Link> {/* Agrega el enlace para ir a la página de login */}
            <LoginModal /> {/* Agrega el componente del modal de login */}
        </div>
    );
};

export default Register;

