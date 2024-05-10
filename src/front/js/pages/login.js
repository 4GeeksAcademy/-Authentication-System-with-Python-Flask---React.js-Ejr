import React,{useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate} from "react-router-dom";
import { LoginForm } from "../component/loginform.js";



 export const Login = () => {

     const {store, action}= useContext(Context)

     return (
        <div className="Login">
            <LoginForm />
        </div>
     )
 };
   