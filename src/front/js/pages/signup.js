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
    const handleClickSignup= async(e)=>{
      // console.log(email,password);
      e.preventDefault();
      console.log(store,actions);
      actions.fetchSignup(email, password)
    }
    

	return (
        <>  
		    <div className="w-100 mt-5">
            <form className="standard-form d-flex gap-2 m-1 align-items-center flex-direction-column justify-content-center p-2">
                <h2 className="d-block bold">Crea una cuenta</h2>
                <input  name="email" 
                        placeholder="Ejemplo@gmail.com" 
                        type="email"
                        className="w-100 p-2"
                        onChange={(e)=> {setEmail(e.target.value)}}/>
                
                <div style={{ position: "relative", display: "block"}} className="w-100">
                <input  name="password" placeholder="Ingresa tu contraseña" 
                        type={showPassword ? "text" : "password"} 
                        className="w-100 p-2 "
                        onChange={(e)=> {setPassword(e.target.value)}}/> 
                <span style={{position: "absolute", top: 0, right: 0, transform: "translate(-30%, 45%)"}} 
                      onClick={()=> handleToggleClick()}>  {showPassword ? <i class="fa-solid fa-eye"></i>: <i class="fa-solid fa-eye-slash"></i>} </span>
                </div>
        
                <button className="button-dark" onClick={(e)=> handleClickSignup(e)} >Crear</button>
                <button className="button-light bg-gray"><Link to ="/catalogue">Regresa al catálogo</Link></button>
                
            </form>
            </div>
        </>
	);
};
