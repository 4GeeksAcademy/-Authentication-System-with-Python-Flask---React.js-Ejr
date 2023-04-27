import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getUserPrivate} from "../services";
import {useParams} from "react-router-dom";


export const Login = props => {
    const params = useParams();


    const [login, setLogin] = useState(
        {
            email: "",
            password: "",
        })

    const navigate = useNavigate()


    const handleChange = ({ target }) => {
        setLogin({ ...login, [target.name]: target.value }) // se setean los cambios en el usestate de Login                                                   
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
       const isLogin =  await loginUser(login)
       if(isLogin) 
       { 
        const token = localStorage.getItem("token");
        const user = await getUserPrivate(token);
       if(user.company){
        navigate("/company/profile")
       }else{
        navigate("/worker/profile")
       }}
    }

    return (
        <React.Fragment>  

            <form onChange={handleChange} onSubmit={handleSubmit} id="container-login" className="container">

                <h5 className="text-center">Iniciar Sesión en Jobs Hood</h5>

                <div id="login" className="border border-2 border-dark">
                    <div className="col">
                        <label htmlFor="form-login" className="form-label">Dirección Email</label>
                        <input type="email" name="email" className="form-control rounded-0" placeholder="email@gmail.com" required />
                    </div>
                    <div className="col">
                        <label htmlFor="inputPassword6" className="form-label">Contraseña</label>
                        <input type="password" name="password" className="form-control rounded-0" aria-labelledby="passwordHelpInline" placeholder="Contraseña" required />
                    </div>
                    <input type="submit" value="Iniciar Sesión" className="btn btn-dark mx-3 my-1  rounded-0"></input>
                </div>
            </form>

        </React.Fragment>

    );



};