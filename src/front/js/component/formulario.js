import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Formulario = () => {
    const { store, actions } = useContext(Context)
    return (

        <form className="d-flex flex-column align-items-center" style={{ backgroundColor: "#FFF6E9" }}>
            <div className="text-center">
                <div className="card-body">
                    <h1>Login Om</h1>
                    <div className="mb-1 text-start">
                        <label for="exampleInputEmail1" className="form-label">Email/Username</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-1 text-start">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary w-50 mt-3">Login</button>
                </div>
                <div className="m-auto">
                <p><a href="#" class="link-primary">Don't have an acount?</a></p>
                </div>
            </div>
            <div>
                <p>Follow us</p>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-facebook"></i>
            </div>
        </form>
    );
};
{/* style={{ fontFamily: "'Poiret One', sans-serif" }} (esta es la fuente de login om) */ }
{/* <div src="https://www.sattology.com/wp-content/uploads/2020/06/simbolo-do-om-ornamental_1058-101.jpg"></div>  ((((esta es la foto de omkara que va en la derecha)))*/ }
