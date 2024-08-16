import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Gestor_bebe } from "./pages/gestor_bebe";
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { New_Blog } from "./pages/new_blog.jsx";
import { All_Blogs } from "./pages/all_blogs.jsx";
import { EditBlog } from "./pages/edit_blog.jsx";
import { BlogDetail } from "./pages/blog_detail.jsx";
import { AddReport } from "./pages/add_report.jsx";
import { ViewReport } from "./pages/view_report.jsx";
import { EditReport } from "./pages/edit_report.jsx";
import { ViewReports } from "./pages/view_all_reports.jsx";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                {/* <Navbar /> */}
                    <Routes>
                        {/* Home */}
                        <Route element={<Home />} path="/" />
                        {/* Perfil */}
                        <Route element={<Login />} path="/Login" />
                        <Route element={<Register />} path="/Register" />
                        {/* Bebé */}
                        <Route element={<Gestor_bebe />} path="/gestor_bebe" />
                        {/* Report */}
                        <Route element={<AddReport />} path="/Today" />
                        <Route path="/baby/:babyId/:reportId" element={<ViewReport />} />
                        <Route path="/edit_report/:babyId/:reportId" element={<EditReport />} />
                        <Route path="/baby/:babyId/reports" element={<ViewReports />} />
                        {/* Blog */}
                        <Route element={<New_Blog />} path="/new_blog" />
                        <Route element={<All_Blogs />} path="/blog" />
                        <Route path="/blog/:type/:id" element={<BlogDetail />} />
                        <Route path="/edit_blog/:type/:id" element={<EditBlog />} />
                        {/* 404 */}
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
