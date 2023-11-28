import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Carousel } from "./component/carousel";
import { Login } from "./pages/login";

import { Perfil } from "./pages/perfil";
import { SegundoPerfil } from "./pages/SegundoPerfil";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";

import { Formulario } from "./component/Formulario.jsx";
import { OtroFormulario } from "./component/OtroFormulario.jsx";
import { Buscador } from "./component/Buscador.jsx";
import { Footer } from "./component/footer.jsx"; 



//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Formulario" element={<Formulario />} />
                        <Route path="/OtroFormulario" element={<OtroFormulario />} />
                        <Route path="/Buscador" element={<Buscador />} />
                        <Route path="*" element={<h1>Not found!</h1>} />     
                        <Route element={<Home />} path="/" />

                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Buscador />} path="/buscador" />
                        <Route element={<Carousel />} path="/carousel" />
                        

                        <Route element={<Perfil />} path="/perfil" />
                        <Route element={<SegundoPerfil />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Footer />} path="/footer" />

                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );


};

export default injectContext(Layout);
