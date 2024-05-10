import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { BackendURL } from "./internal.jsx"

import { Home } from "./pages/home.jsx"
import { Navbar } from "./component/navbar.jsx"
import { Footer } from "./component/footer.jsx"

import appContext from "./store/appContext.jsx"

const Layout = () => {

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default appContext(Layout)
