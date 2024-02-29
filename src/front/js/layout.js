import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Landing } from "./pages/landing";
import { Login } from "./pages/login"
import { Recovery } from "./pages/recovery";
import { HomePatient } from "./pages/homePatient";
import { HomeTherapist } from "./pages/homeTherapist";
import { Scheduling } from "./pages/scheduling";
import { AppointmentScheduler } from "./pages/appointmentScheduler";
import { IncomeControl } from "./pages/incomeControl";
import { Inbox } from "./pages/inbox";
import { Patients } from "./pages/patients";
import { Profile } from "./pages/profile";
import { Payments } from "./pages/payments";
import { PatientSchedule } from "./pages/patientSchedule";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    let role = "therapist";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Landing />} path="/" />
                        <Route element={role === "therapist" ? <HomeTherapist/> : <HomePatient/>} path="/home" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Recovery />} path="/recovery" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Payments />} path="/payments" />
                        <Route element={<PatientSchedule />} path="/patient_schedule" />
                        <Route element={<Scheduling />} path="/scheduling" />
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
