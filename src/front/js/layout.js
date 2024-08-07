import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Perfil from "./pages/perfil";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


import Login from "./pages/login";
import SignUp from "./pages/signUp";
import EditarPerfil from "./pages/editarPerfil";
import Favoritos from "./pages/favoritos";
import Cursos from "./pages/cursos";
import Logout from "./pages/logout";



import Login from "./pages/login";
import SignUp from "./pages/signUp";
import EditarPerfil from "./pages/editarPerfil";
import Favoritos from "./pages/favoritos";
import Cursos from "./pages/cursos";
import Logout from "./pages/logout";



const Layout = () => {

    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Single />} path="/single/:theid"/>
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup"/>
                        <Route element={<EditarPerfil />} path="/editarPerfil"/>
                        <Route element={<Favoritos />} path="/favoritos" />
                        <Route element={<Cursos />} path="/cursos" />
                        <Route element={<Logout />} path="/logout" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
