import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
    const [login, setLogin] = useState("show active")
    const [loginST, setLoginST] = useState("active")
	const [register, setRegister] = useState("")
    const [registerST, setRegisterST] = useState("")


    async function submitLogin(e){
        e.preventDefault();
        if (logged === true) {
            navigate("/")
        }
    }

    async function submitSignUp(e){
        e.preventDefault();
    }
    
    function logines() {
        if (login == "") {
            setLogin("show active")
            setLoginST("active")
            setRegister("")
            setRegisterST("")
        }
    }

    function registeres() {
        if (register == "") {
            setRegister("show active")
            setRegisterST("active")
            setLogin("")
            setLoginST("")
        }
    }

    return (
        <div className="bg-dark bg-opacity-75 text-white p-5" style={{margin: "70px 70px 100px 70px"}}>
            <ul className="nav nav-pills bg-black nav-justified mb-5" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className={"nav-link " + loginST} id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                        aria-controls="pills-login" aria-selected="true" onClick={() => logines()}>Alquileres</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={"nav-link " + registerST} id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                        aria-controls="pills-register" aria-selected="false" onClick={() => registeres()}>Ventas</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className={"tab-pane fade " + login} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form onSubmit={(e) => {submitLogin(e)}}>
                        <h1>Alquileres</h1>
                    </form>
                </div>
                <div className={"tab-pane fade " + register} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form onSubmit={(e) => {submitSignUp(e)}}>
                        <h1>Ventas</h1>
                    </form>
                </div>
            </div>


        </div>
    );
};
