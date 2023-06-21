import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
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
import { VideoRoom } from "./pages/videoroom";
import NotFound from "./pages/notfound";

const Layout = () => {
    const location = useLocation();

    const isFooterHidden = () => {
        return location.pathname === "/videocall";
    };

    const isNavbarHidden = () => {
        return location.pathname === "/videocall";
    };

    useEffect(() => {
        const token = localStorage.getItem("miTokenJWT");

        if (!token && !isPublicRoute(location.pathname)) {
            Navigate("/login");
        }
    }, [location.pathname]);

    const isPublicRoute = (pathname) => {
        const publicRoutes = ["/", "/login", "/signupabuelo", "/signupvoluntario", "/about", "/contact", "/terms", "/privacy"];
        return publicRoutes.includes(pathname);
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
                    <Route element={<VideoRoom />} path="/home" />
                    <Route element={<SignupVoluntario />} path="/signupvoluntario" />
                    <Route element={<SignupAbuelo />} path="/signupabuelo" />
                    <Route element={<Demo />} path="/demo" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Single />} path="/single/:theid" />
                    <Route element={<NotFound />} path="*" />
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
