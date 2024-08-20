import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Single } from "./pages/single";
import { Private } from "./pages/private";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Profile } from "./pages/profile";
import { ToastContainer } from "react-toastify";

import { VistaPrueba } from "./pages/vistaPrueba.jsx";
import { Dashboard } from "./pages/dashboard";
import { Exercises } from "./pages/exercises";
import { ErrorView } from "./pages/error";
import { HistoricoFisico } from "./pages/historicoFisico.js";

const usePageTitle = (defaultTitle) => {
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                document.title = 'Inicio | GYMTRACK';
                break;
            case '/vistaprueba':
                document.title = 'Vista Prueba | GYMTRACK';
                break;
            case '/exercises':
                document.title = 'Ejercicios | GYMTRACK';
                break;
            case '/dashboard':
                document.title = 'Dashboard | GYMTRACK';
                break;
            case '/login':
                document.title = 'Iniciar sesión | GYMTRACK';
                break;
            case '/signup':
                document.title = 'Registrarse | GYMTRACK';
                break;
            case '/private':
                document.title = 'Private | GYMTRACK';
                break;
            case '/profile':
                document.title = 'Perfil | GYMTRACK';
                break;
            case '/demo':
                document.title = 'Demo | GYMTRACK';
                break;
            case '/single':
                document.title = 'Single | GYMTRACK';
                break;
            default:
                document.title = defaultTitle;
        }
    }, [location, defaultTitle]);
};

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div className="bg-neutral-900 min-h-screen flex flex-col gap-6">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <PageTitleManager defaultTitle="Mi Aplicación" />
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<VistaPrueba />} path="/vistaprueba" />
                        <Route element={<HistoricoFisico/>} path="/historicofisico" />
                        <Route element={<Exercises />} path="/exercises" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Private />} path="/private" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ErrorView />} path="/*" />
                    </Routes>
                    <ToastContainer theme="dark" />
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

const PageTitleManager = ({ defaultTitle }) => {
    usePageTitle(defaultTitle);
    return null;
};

export default injectContext(Layout);
