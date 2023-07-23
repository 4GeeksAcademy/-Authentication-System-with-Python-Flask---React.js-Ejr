import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Profile_configuration } from "./pages/profile_configuration";
import { Profile_sales } from "./pages/profile_sales";
import { Block } from "./pages/block";
import { Profile_buys} from "./pages/profile_buys"
import { Profile_buys_done } from "./pages/profile_buys_done";
import { Profile_reviews } from "./pages/profile_reviews";
import { Configuration } from "./pages/configuration";
import { Login } from "./pages/login";
import { On_sale } from "./pages/onSale";


import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Signup } from "./pages/signup";
import ReactSwitch from "react-switch";


import { createContext } from "react";

import { UploadCar } from "./pages/uploadcar";
import { WichVehicle } from "./pages/wichvehiche";
import { UploadMoto } from "./pages/uploadmotorcycle";
import { SingleProduct } from "./pages/singleProduct";

import { Favorites } from "./pages/favorites";
import { OnSale } from "./pages/onSale";
import { EditProduct } from "./pages/editProduct";
import { Profile_garage } from "./pages/profile_garage";
import { Garages } from "./pages/garages";
import { Configuration_Garage } from "./pages/configuration_garage";
import { CreateGarage } from "./pages/create_garage";
import { SearchResults } from "./pages/searchResults";
import { PrivacyPolicy } from "./pages/privacyPolicy";
import { LegalAdvice } from "./pages/legalAdvice";
import { CookiePolicy } from "./pages/cookiePolicy"
import { UploadVehicle } from "./pages/uploadVehicle";



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

                                <Route element={<UploadCar />} path="/upload-car" />
                                <Route element={<UploadMoto />} path="/upload-motorcycle" />
                                <Route element={<WichVehicle />} path="/choose-vehicle" />
                                <Route element={<SingleProduct />} path="/product/:productid" />
                                <Route element={<EditProduct />} path="/edit-product/:productid" />



                                <Route element={<Profile_configuration />} path="/profile/configuration" />
                                <Route element={<Favorites />} path="/profile/favorites" />
                                <Route element={<OnSale />} path="/profile/onsale" />
                                <Route element={<Profile_sales />} path="/profile/sales" />
                                <Route element={<Profile_garage />} path="/profile/garage" />
                                <Route element={<Block />} path="/profile/block" />
                                <Route element={<Profile_buys />} path="/profile/buys" />
                                <Route element={<Profile_buys_done />} path="/profile/buys-done" />
                                <Route element={<Profile_reviews />} path="/profile/reviews" />
                                <Route element={<UploadVehicle />} path="/upload-vehicle" />
                                <Route element={<Configuration />} path="/configuration" />
                                <Route element={<Garages />} path="/garages" />
                                <Route element={<CreateGarage />} path="/create-garage" />
                                <Route element={<Configuration_Garage />} path="/configuration/garage" />
                                <Route element={<SearchResults />} path="/search-result" />
                                <Route element={<LegalAdvice />} path="/aviso-legal" />
                                <Route element={<CookiePolicy />} path="/politica-de-cookies" />
                                <Route element={<PrivacyPolicy />} path="/politica-de-privacidad" />
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
