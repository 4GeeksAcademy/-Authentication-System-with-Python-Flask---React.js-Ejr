import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import { Landing } from "./pages/Landing/landing";
import { Trainer } from "./pages/Trainer/trainer";
import { User } from "./pages/User/user";
import UserForm from "./pages/User/userForm";
import ScrollToTop from "./component/scrollToTop.jsx";
import ExerciceDetail from "./pages/User/exerciseDetail.js";
import ProtectedRoute from "./component/protectedRoute.jsx";

const Layout = () => {

    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route element={<ProtectedRoute roles={['user']} />}>
                            <Route path="/user/:id" element={<User />} />
                            <Route path="/user_form" element={<UserForm />} />
                        </Route>
                        <Route element={<ProtectedRoute roles={['user', 'trainer']} />}>
                            <Route path="/exercise/:id" element={<ExerciceDetail />} />
                        </Route>
                        <Route element={<ProtectedRoute roles={['trainer']} />}>
                            <Route path="/trainer/:id" element={<Trainer />} />
                        </Route>
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);


