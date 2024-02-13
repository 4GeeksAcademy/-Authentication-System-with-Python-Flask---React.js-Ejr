import React, { useContext, useState } from "react";
import login from "../../styles/login.css"
//import LogoURL from "../../img/BabySteps.png";
import { Context } from "../store/appContext";


export const Login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        actions.login(email, password)
    };

    return (
        <form>
            <div class="mb-3">
                <label for="userNameInput" class="form-label">Username</label>
                <input type="text" class="form-control" id="userNameInput" aria-describedby="emailHelp"/>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>

            <div class="mb-3">
                <label for="nameInput" class="form-label">Name</label>
                <input type="text" class="form-control" id="nameInput" aria-describedby="emailHelp"/>
            </div>

            <div class="mb-3">
                <label for="nameInput" class="form-label">Lastname</label>
                <input type="text" class="form-control" id="nameInput" aria-describedby="emailHelp"/>
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputPassword2"/>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary" disabled>SEND</button>
        </form>
    );
};