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
import RegistroLibro from "./pages/registroLibro";
import { Profile } from "./pages/profile";
import { DetalleLibro } from "./pages/detalleLibro";

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

//create your first component
const Layout = () => {
  const basename = process.env.BASENAME || "/";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
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
            <Route element={<Login />} path="/login" />
            <Route element={<Intercambio />} path="/intercambio" />
            <Route
              element={<FormularioRegistro />}
              path="/formularioRegistro"
            />
            <Route element={<h1>Not found!</h1>} />
            <Route
              element={<FormularioRegistro />}
              path="/formularioRegistro"
            />
            <Route element={<RegistroLibro />} path="/registroLibro" />
            <Route element={<DetalleLibro />} path="/detalleLibro/:id" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
