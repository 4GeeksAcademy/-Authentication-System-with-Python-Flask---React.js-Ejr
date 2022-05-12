import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./views/home";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { LoginScreen } from "./views/login";
import { Proyect } from "./views/proyect";
import { UserHome } from "./views/userHome";
import { UserProfile } from "./views/userProfile";
import { UserProfileSetup } from "./views/userprofilesetup";
import { CompanyRegisterSuccess } from "./views/companyregistersuccess";
import { CompanyRegister } from "./views/companyregister";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Navbar />
        <Switch>

            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <LoginScreen />
            </Route>
            <Route exact path="/user_profile_setup">
              <UserProfileSetup />
            </Route>
            <Route exact path="/company_register_success">
              <CompanyRegisterSuccess />
            </Route>
            <Route exact path="/proyect">
              <Proyect />
            </Route>
            <Route exact path="/userHome">
              <UserHome />
            </Route>
            <Route exact path="/userProfile">
              <UserProfile />
            </Route>
            <Route>
              <h1>Not found!</h1>
            </Route>

        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
