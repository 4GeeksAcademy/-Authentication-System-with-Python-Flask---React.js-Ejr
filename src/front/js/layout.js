import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext, { Context } from "./store/appContext";
import {SingleOffer} from "./pages/SingleOffer.jsx"

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Inicio } from "./pages/inicio.js";
import { LoginPage } from "./pages/login";
import { Register } from "./pages/register.js"
import { TimeLine } from "./pages/TimeLine.jsx";
import { FormOffer } from "./component/FormOffer.jsx";
import { SobreNosotros } from "./pages/sobreNosotros.js";
import { Contact } from "./pages/contact.js";
import  PreguntasFrecuentes  from "./pages/preguntasFrecuentes.js";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const { actions } = useContext(Context);

    useEffect(() => {
        actions.loadUserFromToken();
    }, []);


    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element ={<Inicio />} path="/" />
                        <Route element ={<SobreNosotros />} path="/sobrenosotros" />
                        <Route element ={<Contact />} path="/contact" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<TimeLine/>} path="/timeline"/>
                        <Route element={<FormOffer/>} path="/formoffer"/>
                        <Route element={<PreguntasFrecuentes/>} path="/preguntasfrecuentes"/>
                        <Route element={<SingleOffer />} path="/singleoffer/:id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
