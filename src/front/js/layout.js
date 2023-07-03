import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Profile_configuration } from "./pages/profile_configuration";
import { Profile_sales } from "./pages/profile_sales";
import { Profile_buys} from "./pages/profile_buys"
import { Profile_reviews } from "./pages/profile_reviews";
import { Configuration } from "./pages/configuration";
import { Login } from "./pages/login";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Signup } from "./pages/signup";
import ReactSwitch from "react-switch";


import { createContext } from "react";
import { Favorites } from "./pages/favorites";
import { On_sale } from "./pages/onSale";


export const ThemeContext = React.createContext(null)

//create your first component
const Layout = () => {
    const [theme, setTheme] = useState('light')
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;


    const toggleTheme = () => {
        setTheme((act) => (act === "light" ? "dark" : "light"))
    }
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div>
                <div className="App" id={theme}>
                    <BrowserRouter basename={basename}>
                        <ScrollToTop>
                            <Navbar />
                            
                            <Routes>
                                <Route element={<Home />} path="/" />
                                <Route element={<Demo />} path="/demo" />
                                <Route element={<Login />} path="/login" />
                                <Route element={<Signup />} path="/signup" />
                                <Route element={<Profile_configuration />} path="/profile/configuration" />
                                <Route element={<Favorites />} path="/profile/favorites" />
                                <Route element={<On_sale />} path="/profile/onsale" />
                                <Route element={<Profile_sales />} path="/profile/sales" />
                                <Route element={<Profile_buys />} path="/profile/buys" />
                                <Route element={<Profile_reviews />} path="/profile/reviews" />
                                <Route element={<Configuration />} path="/configuration" />
                                <Route element={<Single />} path="/single/:theid" />
                                <Route element={<h1>Not found!</h1>} />
                            </Routes>
                            <Footer />
                        </ScrollToTop>
                    </BrowserRouter>
                </div>
                
            </div>
        </ThemeContext.Provider>
        
    );
};

export default injectContext(Layout);
