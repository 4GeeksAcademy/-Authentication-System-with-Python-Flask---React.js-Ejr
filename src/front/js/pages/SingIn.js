import React, { useState } from 'react';
import "../../styles/SingIn.css";

const SignIn = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return (
        <div>
            <h1>Movie Stars</h1>
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
                    <input type="password" name="password" onChange={handleChange} value={user.password} placeholder="Confirmar Contraseña" required />
                </label>
                <button type="submit">Registrate</button>
                <p>¿Ya tienes una cuenta?, Login</p>
            </form>
        </div>
    );
}

export default SignIn;
