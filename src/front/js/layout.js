import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";




import injectContext from "./store/appContext";

import { Navbar } from "./component/Landing/navbar.jsx";
import { Footer } from "./component/Landing/footer.jsx";
import { Landing } from "./pages/Landing/landing";
import { Trainer } from "./pages/Trainer/trainer";
import { User } from "./pages/User/user";
import { UserForm } from "./pages/User/userForm";
import ScrollToTop from "./scrollToTop.jsx";

const Layout = () => {

    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Landing />} path="/" />
                        <Route element={<User />} path="/user" />
                        <Route element={<UserForm />} path="/user/form" />
                        <Route element={<Trainer />} path="/trainer" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>

            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
