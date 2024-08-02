import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Error404 from "../js/pages/Error404";
import Login from "./pages/Login";

// Import the components for the new routes
import BookAppointment from "./pages/BookAppointment";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import Appointments from "./pages/Appointments";
import AdminDashboard from "./pages/AdminDashboard";

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
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<BookAppointment />} path="/bookappointment" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<UserProfile />} path="/userprofile" />
                        <Route element={<Appointments />} path="/appointments" />
                        <Route element={<AdminDashboard />} path="/admindashboard" />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);