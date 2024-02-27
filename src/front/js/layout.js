import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Login } from "./pages/login";

import { Forgot } from "./pages/forgot";

import { Home } from "./pages/home";



import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { ContextProvider } from "./store/appContext"; // Importa el proveedor de contexto existente
import { BookProvider } from "./book"; // 

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <Router basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />

                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Login />} path="/login" />

                        <Route element={<Forgot />} path="/forgot" />


                        <Route element={<Login />} path="/login" />
                        <Route element={<BookDetails />} path="/books/works/:id" />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </Router>
        </div>
    );
};

export default injectContext(Layout);
