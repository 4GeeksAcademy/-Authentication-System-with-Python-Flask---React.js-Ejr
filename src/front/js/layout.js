import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Footer } from "./component/footer";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { Biker } from "./pages/inicio_biker";
import { UserStore } from "./pages/userState";
import { Menu_Store } from "./pages/inicio_Store.js";
import { MenuStore } from "./pages/inicio_Store.js";
import { Upload_item } from "./pages/Upload";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div className="app">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Registration />} path="/registration" />
            <Route element={<Biker />} path="/biker" />
            <Route element={<UserStore />} path="/userstore" />
            <Route element={<MenuStore />} path="/menustore" />
            <Route element={<Upload_item />} path="/upload_item" />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
