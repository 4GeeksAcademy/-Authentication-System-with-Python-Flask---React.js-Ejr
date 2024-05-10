import React,{useContext, useState} from "react";
 import { Context } from "../store/appContext";
 import { useNavigate} from "react-router-dom";
 import "../../styles/index.css";




 export const LoginForm = () => {
    
    const {store, actions} = useContext(Context)
     
    const [inputEmail, setInputEmail]=useState("")
    // const [inputName, setInputName]=useState("")
    const [inputPassword, setInputPassword]=useState("")


    const navigate = useNavigate();

     async function handleSubmit(e) {
         e.preventDefault()
         let isLogged = await actions.login(inputEmail, inputPassword) //inputName)
         if (isLogged){
            actions.getFavorites()
            navigate("/");    // url del home aqui con navigate
         }
     }
     return (
        <div className="contactForm">
             <h1 className="title">Login</h1>
             <form onSubmit={handleSubmit}>
                 <div className="mb-3">
                     <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: 'brown' }}>Email</label>
                     <input type="email" className="form-control" id="exampleInputEmail1" placeholder="enter your email" name='email' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                 </div>
                 {/* <div className="mb-3">
                     <label htmlFor="exampleInputName" className="form-label" style={{ color: 'orange' }}>Name</label>
                     <input type="text" className="form-control" id="exampleInputName" placeholder="enter your name" name='name' value={inputName} onChange={(e) => setInputName(e.target.value)} />
                 </div> */}
                 <div className="mb-3">
                     <label htmlFor="exampleInputPassword" className="form-label" style={{ color: 'brown' }}>Password</label>
                     <input type="password" className="form-control" id="exampleInputPassword" placeholder="xxxxxxx" name='password' value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                 </div>
                 <button type="submit" className="login btn btn-dark">Login</button>
             </form>
         </div>
               )
            };