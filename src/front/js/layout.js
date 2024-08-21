import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import Perfil from "./pages/perfil";
import About from "./pages/about";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


import {Login} from "./pages/login";
import {SignUp} from "./pages/signUp";
import Cursos from "./pages/cursos";
import VistaProfe from "./pages/vistaProfe"; // importar VistaProfe
import PrivateRoute from "./component/privadaProfe"; 
import PrivateRouteAlumno from "./component/privadaAlumno";
import VistaAlumno from "./pages/vistaAlumno";



const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup"/>
                        <Route element={<Perfil />} path="/perfil"/>
                        <Route element={<Cursos />} path="/cursos" />
                        <Route element={<About />} path="/about" />
                         {/* Protege la ruta VistaAlumno con PrivateRouteAlumno, si el store.autentificacion es true,  y store.usuarioPr?.is_teacher es true, puede accerder */}
                         <Route element={<PrivateRouteAlumno vista={VistaAlumno} />} path="/vistaAlumno" />
                         {/* Protege la ruta VistaProfe con PrivateRoute, si el store.autentificacion es true,  y store.usuarioPr?.is_teacher es true, puede accerder */}
                        <Route element={<PrivateRoute vista={VistaProfe} />} path="/vistaProfe" />
                        <Route element={<h1>Not found!</h1>} path="*" /> 
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);