import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import bookswaplogo from "../../img/logo-final-project.png";
import "../../styles/forms.css";

export const CreateAccount = () => {
    const { store, actions } = useContext(Context);

    const [username, setUsername] = useState("");
    const [profileimg, setProfileimg] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpFunction = (e) => {
        e.preventDefault();
        actions.createAccount(username, profileimg, name, lastname, email, password);
    }

    return (
        <div className="container text-center">
            <img src={bookswaplogo} alt="bookswap" height="100" />
            <div className="row justify-content-center">
                <div className="createaccountform  col-md-6">

                    <form className="row g-3 text-start" method="POST" action="/register" enctype="multipart/form-data" onSubmit={signUpFunction}>

                        <div className="col-md-6">
                            <label className="form-label" for="username">Choose Your Username</label>
                            <div className="input-group">
                                <div className="input-group-text">@</div>
                                <input type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" placeholder="Username" required />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="profileimg" className="form-label">Choose your profile photo</label>
                            <input className="form-control" type="text" onChange={(e) => setProfileimg(e.target.value)} id="profileimg" placeholder="Insert here an image URL" required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label" for="name">What's your name?</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder="Write your name" required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label" for="lastname">And your last name?</label>
                            <input type="text" onChange={(e) => setLastname(e.target.value)} className="form-control" id="lastname" placeholder="Write your name" required />
                        </div>

                        <div className="col-12">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />
                        </div>

                        <div className="col-md-12">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" required />
                        </div>

                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="privacypolicy" required />
                                <label className="form-check-label" for="privacypolicy">
                                    I accept the privacy policy
                                </label>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn createaccountbtn">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount; 