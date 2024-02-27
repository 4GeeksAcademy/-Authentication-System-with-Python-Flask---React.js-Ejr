import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Landing } from "./pages/landing";
import { Login } from "./pages/login"
import { Signup } from "./pages/signup";
import { Recovery } from "./pages/recovery";
import { HomePatient } from "./pages/homePatient";
import { HomeTherapist } from "./pages/homeTherapist";
import { Scheduling } from "./pages/scheduling";
import { AppointmentScheduler } from "./pages/appointmentScheduler";
import { IncomeControl } from "./pages/incomeControl";
import { Inbox } from "./pages/inbox";
import { Patients } from "./pages/patients";
import { Profile } from "./pages/profile";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    let role = "therapist";
    let Home;

    if (role === "therapist") {
        Home = <HomeTherapist />;
    } else {
        Home = <HomePatient />;
    }

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Landing />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Home />} path="/home" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Recovery />} path="/recovery" />
                        <Route element={<Scheduling />} path="/scheduling" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<AppointmentScheduler />} path="/appointment_scheduling" />
                        <Route element={<IncomeControl />} path="/income_control" />
                        <Route element={<Inbox />} path="/inbox" />
                        <Route element={<Patients />} path="/patients" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
