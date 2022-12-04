import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { About } from "./pages/about";
import { Donate } from "./pages/donate";
import { Create } from "./pages/create";
import { Demo } from "./pages/demo";
import { User } from "./pages/user";
import { Signout } from "./pages/signout";
import injectContext from "./store/appContext";

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
          <div className="row">
            <Navbar />
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/donate" element={<Donate />} />
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/demo" element={<Demo />} />
              <Route exact path="/user" element={<User />} />
              <Route exact path="/signout" element={<Signout />} />
              <Route exact path="/" element={<Home />} />
              <Route render={() => <h1>Not found!</h1>} />
            </Routes>
          </div>
          <div className="row">
            <Footer />
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
