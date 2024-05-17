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
            <h1 style={{ textAlign: "center" }}>WELCOME</h1>
            <div>
                <h2>Sign up</h2>
                <Signup />
            </div>
            <br></br>
            <div>
                <h2>Log in</h2>
                <Login />
            </div>
        </div>
    );
};

export default Home;