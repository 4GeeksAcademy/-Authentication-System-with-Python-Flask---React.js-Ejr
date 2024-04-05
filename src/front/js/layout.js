import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Status_Score from "./pages/Status_Score";
import TreasureForm from "./pages/TreasureForm";
import TreasureList from "./pages/TreasureList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

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
                        <Route element={<TreasureForm />} path="/formulario-tesoro" />
                        <Route element={<TreasureList />} path="/lista-tesoros" />
                        <Route element={<Register />} path="/registro" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Rankings />} path="/rankings" />
                        <Route element={<Profile />} path="/perfil" />
                        <Route element={<Status_Score />} path="/puntuacion" />
                        <Route element={<AboutUs />} path="/about-us" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
