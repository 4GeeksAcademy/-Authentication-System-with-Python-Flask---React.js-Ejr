import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const SignUp = () => {
	const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)


    // This will toggle between displaying or not the password
    const handleToggleClick = ()=>{
        setShowPassword(!showPassword);
    }

    const fetchSignup = (e)=>{
        e.preventDefault()
        fetch('https://3001-charlytoc-reactflasktem-3wopardumo2.ws-us90.gitpod.io/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

	return (
        <>  
		    <form className="login-form d-flex align-items-center flex-direction-column container justify-content-center  w-50">
                <h3 className="d-block p-1">Registrate!</h3>
                
                {/* Emaild input below */}
                <input  name="email" 
                        placeholder="Ejemplo@gmail.com" 
                        type="email"
                        className="w-100 p-2"
                        onChange={(e)=> {setEmail(e.target.value)}}/>
                
                <div style={{ position: "relative", display: "block"}} className="w-100">
                
                {/* Password input below */}
                <input  name="password" placeholder="Ingresa tu contraseña" 
                        type={showPassword ? "text" : "password"} 
                        className="w-100 p-2"
                        onChange={(e)=> {setPassword(e.target.value)}}/> 
                <span style={{position: "absolute", top: 0, right: 0, transform: "translate(-30%, 45%)"}} 
                      onClick={()=> handleToggleClick()}>  👁 </span>
                </div>
                
                <h5>Codigo de invitacion</h5>
                <input name="password"placeholder="Ingresa tu codigo de invitacion"  className="w-100 p-2"/>
                <hr/>
                <button className="p-3 w-50 border-0 bg-pink" onClick={(e)=> fetchSignup(e)} >Ingresar</button>
                <h5><Link to ="/catalogue">Regresa al catalogo!</Link></h5>
                
            </form>
        </>
	);
};
