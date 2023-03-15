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
            <button onClick={()=>{console.log(store.isAuthenticated);}}>isAuthenticatedE</button>
		    <form className="login-form d-flex align-items-center flex-direction-column container justify-content-center  w-50">
                <h3 className="d-block p-1">Unete!</h3>
                <input name="email" placeholder="Ejemplo@gmail.com" 
                className="w-100 p-2" 
                onKeyUp={(e)=>setEmail(e.target.value)}/>
                <div style = {{position: "relative"}} className="w-100">
                <input name="password"placeholder="Ingresa tu contraseña"
                 className="w-100 p-2" type={showPassword ? "text" : "password"}
                 onChange={(e)=>setPassword(e.target.value)}/>
                <span style = {{position: "absolute", top: 0, right: 0, transform: "translate(-30%, 45%)"}}
                      onClick={()=>handleToggleClick()}>👁</span>
                </div>
                <h5>Olvidaste tu contraseña?</h5>
                <button className="p-3 w-50 border-0 bg-pink" onClick={(e)=>handleClickLogin(e)}>Ingresa</button>
                <h5><Link to ="/Catalogue">Regresa al catalogo!</Link></h5>
                    
                
            </form>
        </>
	);
};
