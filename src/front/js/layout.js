import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { RegistroDueno } from "./pages/registrodueno";
import { RegistroCaminador } from "./pages/registrocaminador";
import { HomeCaminador } from "./pages/homecaminador";
import { HomeDueno } from "./pages/homedueno";
import { Login } from "./pages/login";
import { SingleDog } from "./pages/singleDog";
import { RegistroPerro } from "./pages/registroPerro";

import ChatPage from "./pages/chatPage";
import Profile from "./pages/Profile";
import ProfileUser from "./pages/profileUser";
import ErrorPage from "./pages/ErrorPage";

import Contact from "./pages/contact";
import Questions from "./pages/questions";
import Terms from "./pages/terms";
import injectContext from "./store/appContext";
import AddDog from "./component/addDog";
import ViewWalkers from "./component/ViewWalkers";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrodueno" element={<RegistroDueno />} />
            <Route path="/registrocaminador" element={<RegistroCaminador />} />
            <Route path="/homedueno" element={<HomeDueno />} />
            <Route path="/homecaminador" element={<HomeCaminador />} />
            <Route path="/singleDog" element={<SingleDog />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/preguntas" element={<Questions />} />
            <Route path="/registroperro" element={<RegistroPerro />} />
            <Route path="/terminosycondiciones" element={<Terms />} />
            <Route path="/adddog" element={<AddDog />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileUser" element={<ProfileUser />} />
            <Route path="/caminadores" element={<ViewWalkers />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
