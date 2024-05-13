import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import "../../styles/index.css";

export const Signup = () => {
    const [inputEmail, setInputEmail]=useState("")
    const [inputPassword, setInputPassword]=useState("")
    const [signupError,setSignupError] = useState(false);
	const navigate = useNavigate();
    const {actions } = useContext(Context);

    async function handleSubmit(e) {
        e.preventDefault()
        let isSignup = await actions.signup(inputEmail, inputPassword) 
        if (isSignup){
            console.log('Signup successful');
            swal ( "Registro con éxito" ,  "Gracias por registrarse en nuestar web!" ,  "success" )
             navigate("/");
        } else {
            setSignupError(true);
            console.log('Signup failed');
        }
    };
    return (
            <div className="contactForm">
                <h1 className="title">Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: 'brown' }}>Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="enter your email" onChange={(e) => setInputEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword" className="form-label" style={{ color: 'brown' }}>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder="xxxxxxx" onChange={(e) => setInputPassword(e.target.value)} />
                    </div>
                    {signupError ? <div className="text-danger mb-3">Todos los campos son obligatorios</div> : null}
                    <button type="submit" className="login btn btn-dark"data-bs-toggle="modal" data-bs-target="#exampleModal">Signup</button>
                </form>
            </div>
    )
};