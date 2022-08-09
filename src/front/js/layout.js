import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import Home from "./pages/home";
import injectContext from "./store/appContext";

import Navbar from "./component/navbar";
import NavbarHome from "./component/navbarHome";
import Footer from "./component/footer";

import Login from "./pages/login";
import AdminCasino from "./pages/adminCasino";
import MenuCasino from "./pages/menuCasino";
import ResumenPanelAdmin from "./pages/adminAdmin";
import PasswordRecoveryEmail from "./pages/passwordRecovery";
import PerfilUsuario from "./pages/perfilUsuario";
import PerfilEmpresa from "./pages/perfilEmpresa";
import PerfilCasino from "./pages/perfilCasino";
import Menu from "./pages/menu";
import DireccionesUsuario from "./pages/infoDelivery";
import AdminEmpresa from "./pages/adminEmpresa";
import Contact from "./pages/contact";
import Reporte from "./pages/reporteProblemas";
import FormReporte from "./pages/formularioReporte";
import ConfirmReporte from "./pages/confirmReporte";
import InfoEmpresa from "./pages/infoEmpresa";
import DatosProblemas from "./pages/infoProblemas";
import Register from "./pages/register";
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <NavbarHome />
          <Routes>
            <Route element={<DatosProblemas />} path="/detalle-problema"></Route>
            <Route element={<InfoEmpresa />} path="/informacion-empresa"></Route>
            <Route element={<ConfirmReporte />} path="/confirmacion-problema"></Route>
            <Route element={<FormReporte />} path="/formulario-problema"></Route>
            <Route element={<Reporte />} path="/reporte-problema"></Route>
            <Route element={<Contact />} path="/contact"></Route>
            <Route element={<DireccionesUsuario />} path="/informacion-delivery"></Route>
            <Route element={<Menu />} path="/user-menu"></Route>
            <Route element={<MenuCasino />} path="/menu-casino"></Route>
            <Route element={<PerfilCasino />} path="/casino"></Route>
            <Route element={<PerfilEmpresa />} path="/empresa"></Route>
            <Route element={<PerfilUsuario />} path="/usuario"></Route>
            <Route element={<ResumenPanelAdmin />} path="/admin"></Route>
            <Route element={<AdminEmpresa />} path="/admin-empresa"></Route>
            <Route element={<AdminCasino />} path="/admin-casino"></Route>
            <Route element={<PasswordRecoveryEmail />} path="/recovery"></Route>
            <Route element={<Register />} path="/register"></Route>
            <Route element={<Login />} path="/login"></Route>
            <Route element={<Home />} path="/" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
