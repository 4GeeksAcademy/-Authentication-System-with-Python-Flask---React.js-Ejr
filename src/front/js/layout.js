import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Africa } from "./pages/africa";
import { AsiaPacific } from "./pages/asiaPacific";
import { CentralAmerica } from "./pages/centralAmerica";
import { MiddleEast } from "./pages/middleEast";
import { SouthAmerica } from "./pages/southAmerica";
import { Regions } from "./pages/regions";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Regions />} path="/regions" />
                        <Route element={<Africa />} path="/regions/africa" />
                        <Route element={<AsiaPacific />} path="/regions/asia-pacific" />
                        <Route element={<CentralAmerica />} path="/regions/central-america" />
                        <Route element={<MiddleEast />} path="/regions/middle-east" />
                        <Route element={<SouthAmerica />} path="/regions/south-america" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
