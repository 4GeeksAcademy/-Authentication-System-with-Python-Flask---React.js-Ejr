import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import { Search } from "./pages/search.jsx";
import { SingleRoute } from "./pages/singleRoute.jsx";
import { CreateEditRoute } from "./pages/createEditRoute.jsx";
import { Profile } from "./pages/profile.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

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
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Search />} path="/search" />
                        <Route element={<SingleRoute />} path="/route/:theid" />
                        <Route element={<CreateEditRoute />} path="/route/:action/:theid" />
                        <Route element={<Profile />} path="/user/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
