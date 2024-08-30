import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Inicio } from "./pages/inicio";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import VistaRegister from "./pages/vista-register";
import VistaLogin from "./pages/vista-login";
import Perfil from "./pages/perfil";
import Profesionales from "./pages/profesionales";
import PregFrecuentes from "./pages/pregFrecuentes";
import Emergencias from "./pages/emergencias";
import ResetPassword from "./pages/reset_password";
import VistaLegalDocs from "./pages/vistaLegalDocs";





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
                        <Route element={<Inicio />} path="/" />
                        <Route element={<VistaRegister />} path="/vista-register" />
                        <Route element={<VistaLogin />} path="/vista-login" />
                        <Route element={<VistaLogin />} path="/vista-login/:token" />
                        <Route element={<ResetPassword />} path="/reset-password/:token" />
                        <Route element={<Perfil />} path="/perfil/:id" />
                        <Route element={<Profesionales />} path="/profesionales" />
                        <Route element={<PregFrecuentes />} path="/preguntas-frecuentes" />
                        <Route element={<Emergencias />} path="/emergencias" />
                        <Route element={<VistaLegalDocs />} path="/vistaLegalDocs" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
