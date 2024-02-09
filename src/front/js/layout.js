import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Events } from "./pages/events";
import Single from "./pages/single"; // Updated import
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { LogIn } from "./pages/login";
import { SignUp } from "./pages/signUp";
import { CreateEvent } from "./pages/createEvent";
import { Contact } from "./pages/contact";
import EventSingle from "./component/EventSingle";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Events />} path="/events" />
                        <Route element={<Single />} path="/single/:id" /> {/* Updated route */}
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<LogIn />} path="/login" />
                        <Route element={<SignUp />} path="/sign-up" />
                        <Route element={<CreateEvent />} path="/create-event" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<EventSingle />} path="/single-event" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
