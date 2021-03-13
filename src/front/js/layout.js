import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
import { ViewGeneral } from "./pages/viewGeneral";
import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

import { PymeView } from "./pages/viewPyme";
import { Jumbotron } from "./component/jumbotron";
import { Barra } from "./component/barra";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<Barra />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/viewGeneral">
						<ViewGeneral />
					</Route>
					<Route exact path="/viewPyme">
						<PymeView />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
