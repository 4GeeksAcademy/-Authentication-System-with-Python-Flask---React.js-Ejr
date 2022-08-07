import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { RegistroDueno } from "./pages/registrodueno";
import { RegistroCaminador } from "./pages/registrocaminador";
import { HomeCaminador } from "./pages/homecaminador";
import { HomeDueno } from "./pages/homedueno";
import { Login } from "./pages/login";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrodueno" element={<RegistroDueno />} />
            <Route path="/registrocaminador" element={<RegistroCaminador />} />
            <Route path="/homedueno/:uid" element={<HomeDueno />} />
            <Route path="/homecaminador/:uid" element={<HomeCaminador />} />

            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
