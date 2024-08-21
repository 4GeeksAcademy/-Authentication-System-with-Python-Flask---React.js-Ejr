import React, {useContext, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Context } from "./store/appContext";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Private } from "./pages/private";
import Gallery from "./pages/gallery";
import Discover from "./pages/discover";
import Singup from "./component/signup";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import Footer from './component/footer';

import ContactUs from "./pages/ContactUs";
import { TokenValidator } from "./component/TokenValidator";

//create your first component
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
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Gallery />} path="/galeria" />
                        <Route element={<Discover />} path="/events" />
                        <Route element={<Singup />} path="/register" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<ContactUs />} path="/contact-us" />
                        <Route element={<TokenValidator />} path="/app">
                            <Route element={<Private />} path="exemplo" /> 
                            {/* qualquer rutas protegida aqui */}
                        </Route>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
