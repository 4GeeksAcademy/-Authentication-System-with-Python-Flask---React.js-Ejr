import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import { Footer } from "./component/footer";
import OrderList from "./pages/order";
import { Africa } from "./pages/africa";
import { AsiaPacific } from "./pages/asiaPacific";
import { CentralAmerica } from "./pages/centralAmerica";
import { MiddleEast } from "./pages/middleEast";
import { SouthAmerica } from "./pages/southAmerica";
import { Regions } from "./pages/regions";
import { OrderView } from "./pages/payment";
import ProtectedRoute from "./pages/protectedRoute"; // Import the ProtectedRoute component

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/demo" element={<ProtectedRoute element={<Demo />} />} />
                        <Route path="/order" element={<ProtectedRoute element={<OrderList />} />} />
                        <Route path="/regions" element={<ProtectedRoute element={<Regions />} />} />
                        <Route path="/regions/africa" element={<ProtectedRoute element={<Africa />} />} />
                        <Route path="/regions/asia-pacific" element={<ProtectedRoute element={<AsiaPacific />} />} />
                        <Route path="/regions/central-america" element={<ProtectedRoute element={<CentralAmerica />} />} />
                        <Route path="/regions/middle-east" element={<ProtectedRoute element={<MiddleEast />} />} />
                        <Route path="/regions/south-america" element={<ProtectedRoute element={<SouthAmerica />} />} />
                        <Route path="/single/:theid" element={<ProtectedRoute element={<Single />} />} />
                        <Route path="/payment" element={<ProtectedRoute element={<OrderView />} />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
