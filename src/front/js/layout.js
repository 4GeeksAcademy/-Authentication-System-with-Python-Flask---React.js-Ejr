import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { CreateAccount } from "./pages/create_account";
import { Login } from "./pages/login"
import { BookDetails } from "./pages/book_details";
import { Reset } from "./pages/reset_password";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { ProfileSettings } from "./pages/ProfileSettings";
import { Wishlist } from "./pages/Wishlist";
import { Friends } from "./pages/Friends";
import { PublicProfile } from "./pages/PublicProfile";
import { OurBooks } from "./pages/OurBooks";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { BookCarousel } from "./component/BookCarousel";
import { TargetCard } from "./component/targetCard";
import { ProfileOne } from "./component/ProfileOne";
import { ProfileTwo } from "./component/ProfileTwo";


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
                        <Route element={<CreateAccount />} path="/create-account" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<BookDetails />} path="/book-details" />
                        <Route element={<Reset />} path="/reset-password" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ProfileSettings />} path="/ProfileSettings" />
                        <Route element={<Wishlist />} path="/Wishlist" />
                        <Route element={<OurBooks />} path="/OurBooks" />
                        <Route element={<Friends />} path="/Friends" />
                        <Route element={<PublicProfile />} path="/PublicProfile" />
                        <Route element={<BookCarousel />} path="/carousel" />
                        <Route element={<TargetCard />} path="/targetCard" />
                        <Route element={<ProfileOne />} path="/profileOne" />
                        <Route element={<ProfileTwo />} path="/profileTwo" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
