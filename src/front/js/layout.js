import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/Login";
import { LoginUsuario } from "./pages/LoginUsuario";
import { Services } from "./pages/services";
import { Questions } from "./pages/questions";
import { Book } from "./pages/book";
import injectContext from "./store/appContext";
import { RecoveryPassword } from "./pages/recovery";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { AboutUs } from "./pages/aboutUs";
import { TestData } from "./pages/testdata";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/Register" />
                        <Route element={<LoginUsuario />} path="/Login" />
                        <Route element={<Services />} path="/services" />
                        <Route element={<Book />} path="/book" />
                        <Route element={<Questions />} path="/frecuently-asked-questions" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<RecoveryPassword />} path="/recovery" />
                        <Route element={<AboutUs />} path="/aboutUs" />
                        <Route element={<TestData />} path="/testdata" />
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
