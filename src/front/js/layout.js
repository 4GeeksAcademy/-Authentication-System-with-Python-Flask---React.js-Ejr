import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from "../../front/js/store/appContext"
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Userview } from "./pages/UserView";
import { Companyview } from "./pages/CompanyView";
import injectContext from "./store/appContext";
import { Inicio } from "./pages/inicio"
import { Contact } from "./pages/contact"
import { LoginPage } from "./pages/login"
import { Navbar } from "./component/navbar";
import { Register } from "./pages/register";
import { TimeLine } from "./pages/TimeLine.jsx";
import { Footer } from "./component/footer";
import { SobreNosotros } from "./pages/sobreNosotros";
import { FormOffer } from "./component/FormOffer.jsx";
import PreguntasFrecuentes from "./pages/preguntasFrecuentes.js";
import { SingleOffer } from "./pages/SingleOffer.jsx";
import { FavoritosPage } from "./pages/favoritosPage.js"; 

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadUserFromToken();
    }, []);


    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Inicio />} path="/" />
                        <Route element={<SobreNosotros />} path="/sobrenosotros" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Companyview />} path="/company" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<TimeLine />} path="/timeline" />
                        <Route element={<FormOffer />} path="/formoffer" />
                        <Route element={<Userview />} path="/Userview" />
                        <Route element={<Companyview />} path="/Companyview" />
                        <Route element={<PreguntasFrecuentes />} path="/preguntasfrecuentes" />
                        <Route element={<SingleOffer />} path="/singleoffer/:id" />
                        <Route element={<FavoritosPage />} path="/favoritosPage" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
