import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { EventDescription } from "./pages/eventDescription";

import { Navbar } from "./component/navbar"
import { Footer } from "./component/footer"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<<<<<<< HEAD
import CreateEventForm from "./pages/createEventForm";
=======
import { Events } from "./pages/events";
>>>>>>> b56586df9b3a724b2da85f26b11cbc29a863a9b4

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
<<<<<<< HEAD
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<CreateEventForm />} path="/createEventForm" />
=======
                        <Route element={<EventDescription />} path="/description/:theid" />
                        <Route path="events/:category" element={<Events />} />
>>>>>>> b56586df9b3a724b2da85f26b11cbc29a863a9b4
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
