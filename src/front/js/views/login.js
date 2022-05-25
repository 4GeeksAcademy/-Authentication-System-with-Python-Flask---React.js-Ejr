import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useHistory } from "react-router-dom"
import "../../styles/login.css";
import { useState } from "react";
import { UserHome } from "./userHome";
import { Context } from "../store/appContext";
import 'animate.css';

export const LoginScreen = () => {
  const { store, actions} = useContext(Context)
  const [email, setEmail] = useState("") ;
  const [password, setPassword] = useState("") ;
  const token = sessionStorage.getItem('token');
  const history = useHistory();

  const handleClick = () => {

     actions.login(email, password).then(() =>{
       history.push("/user_home")
     })
       
  

  }

  return (
    <div id="login ">

    {(store.token && store.token !== "" && store.token !== undefined) ? <div><h3 className="text-center">Ya ingresaste!</h3> 
    <h4 className="text-center my-5">
    Por favor, anda a Home!
    </h4>
    <Link to="/user_home" className="d-flex justify-content-center">
      <button className="mx-auto my-5">Ir a Home!</button>
    </Link>
    </div>
     : 
    
    
    
      <div className="container my-5">
        <div
          id="login-row"
          className="row justify-content-center align-items-center animate_animated animate__fadeInRightBig "
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form">
                <h3 className="text-center ">Login</h3>
                <div className="form-group">
                  <label for="email" >
                   Email:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={
                      (e) => setEmail(e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label for="password" className="">
                    Contraseña:
                  </label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={
                      (e) => setPassword(e.target.value)
                    }
                  />
                </div>
                <br />
                <div className="form-group">
                  
                    <button
                      type="button"
                      name="submit"
                      className="btn btn-dark btn-md"
                      value="submit"
                      onClick={handleClick}
                    >
                      Entrar
                    </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    }


    </div>
  );
};
