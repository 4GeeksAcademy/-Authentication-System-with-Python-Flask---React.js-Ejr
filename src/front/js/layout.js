import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { ManageOrder } from "./pages/manageorder.js";
import { Single } from "./pages/single";
import { Login } from "./pages/login.js";
import { Retrive1 } from "./pages/retrive1.js";
import { Retrive2 } from "./pages/retrive2.js";
import { Register } from "./pages/register.js";
import { Register1 } from "./pages/register1.js";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/register1">
							<Register1 />
						</Route>
						<Route exact path="/retrive1">
							<Retrive1 />
						</Route>
						<Route exact path="/retrive2">
							<Retrive2 />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/manageorder">
							<ManageOrder />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
