import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Login } from "./pages/login";
<<<<<<< HEAD

=======
>>>>>>> b98963e3044b4cacaf4251627f5982fbe3a92fe2
import Home from './pages/home';
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
<<<<<<< HEAD


=======
import BookDetails from "./pages/book";
>>>>>>> b98963e3044b4cacaf4251627f5982fbe3a92fe2
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <Router basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
<<<<<<< HEAD
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Login />} path="/login" />
<<<<<<< HEAD
=======
                        <Route element={<BookDetails />} path="/books/works/:id" />
                        <Route path="*" element={<h1>Not found!</h1>} />
>>>>>>> b98963e (books details)
=======
                        <Route element={<Login />} path="/login" />
                        <Route element={<BookDetails />} path="/books/works/:id" />
                        <Route path="*" element={<h1>Not found!</h1>} />
>>>>>>> b98963e3044b4cacaf4251627f5982fbe3a92fe2
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </Router>
        </div>
    );
};

export default injectContext(Layout);
