import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Perfil } from "./pages/perfil";


import injectContext from "./store/appContext";
import {Login} from "./pages/login";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import SidebarWithHeader from "./component/sideBar.jsx";
import { BotonLogout } from "./pages/logout";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/index.css";
import CallToActionWithIllustration from "./pages/inicio";
import {Conversor} from "./pages/conversore"

import Home from "./pages/home";

import Educacion from "./pages/Educacion.jsx";
import RutaAprendizaje from "./pages/rutaAprendizaje.jsx";



import WhatIf from "./pages/whatIf.jsx";

//create your first component
const Layout = () => {
  const {isAuthenticated} = useAuth0();
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div className="tracker">
         {/* <CallToActionWithIllustration/>
           {isAuthenticated ? <>
          <SidebarWithHeader/>
           <Home/>
          </>
          :<Login/>*/}
      
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
          <Route element={<CallToActionWithIllustration />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Conversor />} path="/conversor" />
            <Route element={<Home />} path="/" />
        
            <Route element={<WhatIf />} path="/whatif" />
      
            <Route element={<Educacion />} path="/educacion" />
            <Route element={<RutaAprendizaje />} path="/ruta" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
