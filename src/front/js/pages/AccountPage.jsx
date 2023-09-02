import React from "react";
import Navbar from "../component/NavBar.jsx";
import LoginForm from "../component/LoginForm.jsx";
import RegisterForm from "../component/RegisterForm.jsx";



function AccountPage(){
    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <body>
                <div className="title-container">
                <h1>CUENTA</h1>
                <div className="orange-line">
                </div>
                </div>
                <div className="AccountPage-container">
                <LoginForm/>
                <RegisterForm/>
                </div>
                
            </body>
        </div>
    )
}

export default AccountPage