import React, { useContext,useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);

    const [password,setPassword]= useState("")
    const [email,setEmail]= useState("")
    const [showPassword, setShowPassword]= useState(false);

    
    const handleToggleClick = ()=>{
        setShowPassword(!showPassword);
      
    }
    const handleClickLogin = (e)=>{
        e.preventDefault();
        actions.fetchLogin(email,password)
    }


	return (
        <>
		    <div className="w-100 mt-5">
            <form className="standard-form d-flex gap-2 align-items-center flex-direction-column justify-content-center p-2">
                <h2 className="bold">Inicia sesión en tu cuenta</h2>
                <input name="email" placeholder="Ejemplo@gmail.com" 
                className="w-100 p-2" 
                onKeyUp={(e)=>setEmail(e.target.value)}/>
                <div style = {{position: "relative"}} className="w-100">
                <input name="password"placeholder="Ingresa tu contraseña"
                 className="w-100 p-2" type={showPassword ? "text" : "password"}
                 onChange={(e)=>setPassword(e.target.value)}/>
                <span style = {{position: "absolute", top: 0, right: 0, transform: "translate(-30%, 45%)"}}
                      onClick={()=>handleToggleClick()}>{showPassword ?<i class="fa-solid fa-eye"></i> :<i class="fa-solid fa-eye-slash"></i> }</span>
                </div>
                <button className="button-dark" onClick={(e)=>handleClickLogin(e)}>Ingresar</button>
                <button className="button-light bg-gray"><Link to ="/Catalogue">Regresar al catálogo</Link></button>
                    
                
            </form>
            </div>
        </>
	);
};
