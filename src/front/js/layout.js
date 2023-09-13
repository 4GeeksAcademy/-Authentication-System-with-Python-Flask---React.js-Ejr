import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
//import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Servicios } from "./pages/servicios";
import { Single } from "./pages/single";
import Payment from "./pages/payment";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Eventos from "./pages/eventos";
import Galeria from "./component/galeria";
import Perfil from "./pages/perfil";
import ContactPage from "./pages/contacto";
import AccountPage from "./pages/cuenta";
import NextEvent from "./component/nextEvent";
import Registrarse from "./component/registrarse";
import Organizadores from "./pages/organizadores";
import UserProfile from "./component/perfil";
import TeamList from "./pages/equiposparticipantes";
import UserPage from "./pages/perfil";
import PerfirOrganizador from "./pages/perfilorganizador";
import RegistroDeOrganizadores from "./pages/registrarOrganizadores";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    //if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<TeamList />} path="/teams" />
                        <Route element={<UserPage />} path="/profile" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Servicios />} path="/servicios" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Payment />} path="/payment" />
                        <Route element={<Eventos />} path="/eventos" />
                        <Route element={<Galeria />} path="/galeria" />
                        <Route element={<Perfil />} path="/perfil" />
                        <Route element={<ContactPage />} path="/contacto" />
                        <Route element={<AccountPage />} path="/cuenta" />
                        <Route element={<NextEvent />} path="/nextEvent" />
                        <Route element={<Registrarse />} path="/registrarse" />
                        <Route element={<Organizadores />} path="/organizadores" />
                        <Route element={<PerfirOrganizador />} path="/perfilorganizador" />
                        <Route element={<RegistroDeOrganizadores />} path="/registrarorganizadores" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);