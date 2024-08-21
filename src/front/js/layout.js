import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Single } from "./pages/single";
import { SignUp } from "./pages/signUp"; 
import { Login } from "./pages/login"; 
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<SignUp />} path="/signup" /> {/* Add the SignUp route */}
                        <Route element={<Login />} path="/login" /> {/* Add the Login route */}
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} path="*" /> {/* 404 Not Found Route */}
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
