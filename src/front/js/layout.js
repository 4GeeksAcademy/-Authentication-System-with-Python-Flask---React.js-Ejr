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
import MechanicDashboard from "./pages/MechanicDashboard";
import AppointmentDetails from "./pages/AppointmentDetails";
import CreateAppointmentRegisteredUser from "./pages/CreateAppointmentRegisteredUser";
import AppointmentConfirmed from "./pages/AppointmentConfirmed";
import AccountAndAppointmentCreated from "./pages/AccountAndAppointmentCreated";


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
                        <Route element={<BookAppointmentUnregisteredUser />} path="/bookappointment" />
                        <Route element={<CreateAppointmentRegisteredUser />} path="/createappointmentregistereduser" />
                        <Route element={<AppointmentConfirmed />} path="/appointmentconfirmed" />
                        <Route element={<AccountAndAppointmentCreated />} path="/accountandappointmentcreated" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<UserDashboard />} path="/userdashboard" />
                        <Route element={<UserAppointments />} path="/userappointments" />
                        <Route element={<AdminDashboard />} path="/admindashboard" />
                        <Route element={<MechanicDashboard />} path="/mechanicdashboard" />
                        <Route element={<AppointmentDetails />} path="/appointmentdetails/:appointmentId" />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);