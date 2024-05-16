import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Signup from "../component/registroUsuario";
import Login from "../component/iniciarSesion";

export const Home = () => {
    const { actions } = useContext(Context);


    return (
        <div>
            <div>
                <h2>Signup Form</h2>
                <Signup />
            </div>
            <div>
                <h2>Login Form</h2>
                <Login />
            </div>
        </div>
    );
};

export default Home;