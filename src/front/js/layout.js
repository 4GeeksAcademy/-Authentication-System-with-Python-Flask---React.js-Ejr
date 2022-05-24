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
import { UserProyects } from "./views/userProyects";
import { CompanyProyects } from "./views/companyProyects";
import { UserProfileSetup } from "./views/userprofilesetup";
import { CompanyRegisterSuccess } from "./views/companyregistersuccess";
import { CompanyRegister } from "./views/companyregister";
import { UserRegister } from "./views/userRegister";
import { CompanyDashboard } from "./views/companydashboard";
import { LoginEmpresa } from "./views/loginEmpresa";

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
          <Route exact path="/company_login">
            <LoginEmpresa />
          </Route>
          <Route exact path="/register">
            <UserRegister />
          </Route>
          {/* <Route exact path="/user_profile_setup">
            <UserProfileSetup />
          </Route> */}
          <Route exact path="/company_register">
            <CompanyRegister />
          </Route>
          <Route exact path="/company_register_success">
            <CompanyRegisterSuccess />
          </Route>
          <Route exact path="/proyect/:id">
            <Proyect />
          </Route>
          <Route exact path="/user_home">
            <UserHome />
          </Route>
          <Route exact path="/user_proyects">
            <UserProyects />
          </Route>
          <Route exact path="/user_profile">
            <UserProfile />
          </Route>
          <Route exact path="/company_proyects">
            <CompanyProyects />
          </Route>
          <Route exact path="/company_dashboard">
            <CompanyDashboard />
          </Route>
          <Route>
            <h1 className="text-center">
              No pudimos encontrar lo que necesitas!
            </h1>
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
