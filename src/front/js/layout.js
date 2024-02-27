import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Departments } from "./pages/departments";
import { Contactus } from "./pages/contact";
import { Exhibits } from "./pages/exhibits";
import { Profile } from "./pages/profile";
import injectContext from "./store/appContext";
import  Login  from "./component/login"
import { Department } from "./pages/department";
import { Museums } from "./pages/museums";

import  Navbar  from "./component/navbar";
import { Footer } from "./component/footer";
import SignUp from "../js/component/signup";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const [authAttempt, setAuthAttempt]= useState(null)
    const [ authStatus, setAuthStatus ] = useState('');


    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar authAttempt={authAttempt} />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Departments />} path="/departments" />
                        <Route element={<Contactus />} path="/contact" />
                        <Route element={<Exhibits />} path="/exhibits" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Department />} path="/department/:thedepartment" />
                        <Route element={<Museums />} path="/museums" />
                        <Route element={<Login setAuthAttempt={setAuthAttempt} setAuthStatus={setAuthStatus} />} path="/login" />
                        <Route element={<SignUp setAuthStatus={setAuthStatus} />} path="/signup" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
