import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Signup from "../component/registroUsuario";
import Login from "../component/iniciarSesion";

export const Home = () => {
    const { actions } = useContext(Context);

    const handleSignup = (email, password) => {
        actions.Signup(email, password);
    };

    const handleLogin = (email, password) => {
        actions.Login(email, password);
    };

    return (
        <div>
            <h1>HOME</h1>
            <div>
                <h2>Signup Form</h2>
                <Signup onSubmit={handleSignup} />
            </div>
            <div>
                <h2>Login Form</h2>
                <Login onSubmit={handleLogin} />
            </div>
        </div>
    );
};

export default Home;