import React from "react";
import Navbar from "../component/NavBar.jsx";
import LoginForm from "../component/LoginForm.jsx";



function AccountPage(){
    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <body>
                <LoginForm/>
            </body>
        </div>
    )
}

export default AccountPage