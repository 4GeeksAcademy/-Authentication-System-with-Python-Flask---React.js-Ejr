import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";

/* CATEGORIAS */
import { LibroVenta } from "./pages/libroVenta";
import { MasVendidos } from "./pages/masVendidos";
import { LibrosIntercambio } from "./pages/librosIntercambio";
import { DonacionesRealizadas } from "./pages/donacionesRalizadas";
// import Card from "./component/reviewsLibros/Card";
// import Testimonio from "./component/reviewsLibros/Testimonio";
import BookReviews from "./pages/BookReviews";
import Login from "./component/login/Login";
import Intercambio from "./pages/Intercambio";
import FormularioRegistro from "./pages/formularioRegistro";

/* FOOTERS */
import { GuiaCompra } from "./pages/guiaCompra";
import { MetodoPago } from "./pages/metodoPago";
import { MetodoEnvio } from "./pages/metodoEnvio";
import { SobreNosotros } from "./pages/sobreNosotros";
import { NuestraHistoria } from "./pages/nuestraHistoria";
import { ComoDonar } from "./pages/comoDonar";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Dashboard from "./pages/Dashboard";
import ProfileUser from "./pages/ProfileUser";

//create your first component
const Layout = () => {
  const basename = process.env.BASENAME || "/";
  // const [useAlternateNavbar, setUseAlternateNavbar] = useState(false); // Estado para controlar el Navbar alternativo

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route element={<Dashboard />} path="dashboard" />
          </Routes>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<LibroVenta />} path="/libroVenta" />
            <Route element={<MasVendidos />} path="/masVendidos" />
            <Route element={<LibrosIntercambio />} path="/librosIntercambio" />
            <Route element={<GuiaCompra />} path="/guiaCompra" />
            <Route element={<MetodoPago />} path="/metodoPago" />
            <Route element={<MetodoEnvio />} path="/metodoEnvio" />
            <Route element={<SobreNosotros />} path="/sobreNosotros" />
            <Route element={<NuestraHistoria />} path="/nuestraHistoria" />
            <Route
              element={<DonacionesRealizadas />}
              path="/donacionesRalizadas"
            />
            <Route element={<ComoDonar />} path="/comoDonar" />
            <Route element={<BookReviews />} path="/bookreviews" />
            <Route element={<FormularioRegistro />} path="/registro" />
            <Route element={<Login />} path="/login" />
            <Route element={<Intercambio />} path="/intercambio" />
            <Route element={<ProfileUser />} path="/profile" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
