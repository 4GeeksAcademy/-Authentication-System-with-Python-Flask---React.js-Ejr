import React from "react";
import LoginForm from "../component/login.js";
import RegisterForm from "../component/register.js";
import "../../styles/accountpage.css";
import LoginImage from '../../img/organizadores/LoginImage.jpg'

function AccountPage(){
    return(
        <div className="account">
                <div className="title-container text-center">
                    <h1>Cuenta</h1>
                    <div className="divider divider-default m-3"></div>
                </div>
                <div className="AccountPage-container">
                    <div className="AccountPage">
                    <LoginForm/>
                    </div>
                    
                </div>
        </div>
    )
}

export default AccountPage