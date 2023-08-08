import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import LogIn from "./pages/LogIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx"
import UserPrivate from "./pages/UserPrivate.jsx";
import BusinessUserPrivate from "./pages/BusinessUserPrivate.jsx";
import Business_offers from "./pages/Business_offers.jsx";
import Trips from "./pages/Trips.jsx";
import SignupGeneralView from "./pages/SignupGeneralView.jsx";
import Reviews from "./pages/Reviews";
import TermsConditions from "./pages/TermsConditions.jsx";

import injectContext from "./store/appContext";

import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import ContactForm from "./component/ContactForm";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<SignupGeneralView />} path="/signup" />
                        <Route element={<LogIn />} path="/login" />
                        <Route element={<ForgotPassword />} path="/forgot_password" />
                        <Route element={<ContactForm />} path="/contact" />
                        <Route element={<UserPrivate />} path="/user/private" />
                        <Route element={<BusinessUserPrivate />} path="/business_user/private" />
                        <Route element={<Business_offers />} path="/business_offers" />
                        <Route element={<Trips />} path="/trips" />
                        <Route element={<Reviews />} path="/reviews" />
                        <Route element={<TermsConditions />} path="/terms" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
