import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home.jsx";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { RegistroWorker } from "./pages/form-register-worker.jsx";
import { Login } from "./pages/login-users.jsx";
import { RegisterCompany } from "./pages/form-register-company.jsx";



const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
           
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<RegistroWorker />} path="/register/worker" />
                        <Route element={<RegisterCompany />} path="/register/company" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
