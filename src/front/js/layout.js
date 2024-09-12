import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { Registro_edad } from "./pages/registro_edad";
import { Perfil } from "./pages/perfil";
import { Busqueda } from "./pages/busqueda";
import { Match_busqueda } from "./pages/match_busqueda";
import { Match_resultados } from "./pages/match_resultados";
import { Registro_plataforma } from "./pages/registro_plataforma";
import { Registro_juegos } from "./pages/regisltro_juegos";
import { Registro_form } from "./pages/registro_form";
import { Registro_genero } from "./pages/registro_genero";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>            
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login/>} path="/login"/>
                        <Route element={<Registro_edad/>} path="/registro-edad"/>
                        <Route element={<Perfil/>} path="/perfil"/>
                        <Route element={<Busqueda/>} path="/busqueda"/>
                        <Route element={<Match_busqueda/>} path="/match-busqueda"/>
                        <Route element={<Match_resultados/>} path="/match-resultados"/>
                        <Route element={<Registro_plataforma/>} path="/registro-plataforma"/>
                        <Route element={<Registro_juegos/>} path="/registro-juegos"/>
                        <Route element={<Registro_form/>} path="/registro-form"/>
                        <Route element={<Registro_genero/>} path="/registro-genero"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
