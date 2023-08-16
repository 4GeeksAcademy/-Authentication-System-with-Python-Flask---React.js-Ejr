import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/SignIn.css";
import Moviestar from "../../img/Moviestar.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Context } from '../store/appContext';


export const SignIn = () => {
    const { actions } = useContext(Context)
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
    const handleSuperChange = (e) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const signup = await actions.signup(user)
        if (signup === true) { navigate("/") }

    }

    return (
        <div className="text-center mt-5">
            <div>
                <img id="mo" src={Moviestar} />
            </div>
            <form onSubmit={handleSubmit}>
                <div id="label">
                    <input type="text" name="name" onChange={handleChange} value={user.name} placeholder="Nombre de usuario" required />
                </div>
                <div id="label">
                    <input type="email" name="email" onChange={handleChange} value={user.email} placeholder="Email" required />
                </div>
                <div id="label">
                    <input type="password" name="password" onChange={handleChange} value={user.password} placeholder="Contraseña" required />
                </div>
                <div id="label">
                    <input type="password" name="confirm_password" onChange={handleChange} value={user.confirm_password} placeholder="Confirmar Contraseña" required />
                </div>
                <select id="securityQuestion" name="secret_question" value={user.secret_question} onChange={handleSuperChange}>
                    <option value="">Select a question...</option>
                    <option value="Your favorite pet">What is the name of your favorite pet?</option>
                    <option value="The city you were born in">In which city were you born?</option>
                    <option value="Your favorite movie">What is your favorite movie or book?</option>
                    <option value="Your mother's last name">What is your mother's maiden name?</option>
                    <option value="Your favorite sport">What is your favorite sport?</option>
                </select>
                {/* <label>

                  <input type="text" name="secret_question" onChange={handleChange} value={user.secret_question} placeholder="Pregunta Secreta" required />
                   </label> */}
                <div id="label">
                    <input type="text" name="secret_answer" onChange={handleChange} value={user.secret_answer} placeholder="Respuesta Secreta" required />
                </div>
                <button type="submit">Registrate</button>
                <p>¿Ya tienes una cuenta?, <Link to="/login" className="login-link">Login</Link></p>
            </form>
        </div>
    );
};