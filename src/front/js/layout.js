import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Error404 from "../js/pages/Error404";
import Login from "./pages/Login";

// Import the components for the new routes
import BookAppointmentUnregisteredUser from "./pages/BookAppointmentUnregisteredUser";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import UserAppointments from "./component/UserAppointments";
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
                        <Route element={<Login />} path="/login" />
                        <Route element={<BookAppointmentUnregisteredUser />} path="/bookappointmentunregistereduser" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<UserDashboard />} path="/userdashboard" />
                        <Route element={<UserAppointments />} path="/userappointments" />
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