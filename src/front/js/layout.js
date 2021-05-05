import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login1 } from "./pages/login";
import { Register1 } from "./pages/register";
import { Forgot1 } from "./pages/forgot";
import injectContext from "./store/appContext";

import { Navbar1 } from "./component/navbar";
import { Footer1 } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar1 />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/login">
							<Login1 />
						</Route>
						<Route exact path="/register">
							<Register1 />
						</Route>
						<Route exact path="/forgot">
							<Forgot1 />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer1 />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
