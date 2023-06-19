import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Landing } from "./pages/landing";
import { Login } from "./pages/login";
import { SignupAbuelo } from "./pages/signupabuelo";
import { SignupVoluntario } from "./pages/signupvoluntario";
import Videocall from "./pages/videocall";

const Layout = () => {
    const location = useLocation();

    const isFooterHidden = () => {
        return location.pathname === "/videocall";
    };

    const isNavbarHidden = () => {
        return location.pathname === "/videocall";
    };

    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
        return <BackendURL />;
    }

    return (
        <div>
            <ScrollToTop>
                {!isNavbarHidden() && <Navbar />}
                <Routes>
                    <Route element={<Landing />} path="/" />
                    <Route element={<Videocall />} path="/videocall" />
                    <Route element={<SignupVoluntario />} path="/signupvoluntario" />
                    <Route element={<SignupAbuelo />} path="/signupabuelo" />
                    <Route element={<Demo />} path="/demo" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Single />} path="/single/:theid" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
                {!isFooterHidden() && <Footer />}
            </ScrollToTop>
        </div>
    );
};

const App = () => (
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
);

export default injectContext(App);