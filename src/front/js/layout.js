import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Productos } from "./pages/productos";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";

import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Register } from "./pages/register";
import { Razones } from "./pages/razones";
import { Contacto } from "./pages/contacto";
import { Productos2 } from "./pages/productos2";
import { Productos3 } from "./pages/productos3";
import { Prueba } from "./pages/prueba";
import { Sub } from "./pages/sub";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
            <ScrollToTop>
                
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Razones />} path="/razones" />
                        <Route element={<Productos/>} path ="/productos"/>
                        <Route element={<Contacto/>} path ="/contacto"/>
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Productos2/>} path="/productos2" />
                        <Route element={<Productos3/>} path="/productos3" />
                        <Route element={<Prueba/>} path="/prueba" />
                        <Route element={<Sub/>} path="/sub" />
                      
                        
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                  
                    </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
