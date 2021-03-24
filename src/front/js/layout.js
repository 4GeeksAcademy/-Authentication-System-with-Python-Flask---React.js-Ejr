import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { CheckOut } from "./pages/checkout";
import { Complex } from "./pages/complex";
import { Contact } from "./pages/contact";
import { Demo } from "./pages/demo";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { NotFound } from "./pages/notfound";
import { Profile } from "./pages/profile";
import { Recover } from "./pages/recover";
import { Reserve } from "./pages/reserve";

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
						<Route exact path="/checkout">
							<CheckOut />
						</Route>
						<Route exact path="/complex/:theId">
							<Complex id="theId" />
						</Route>
						<Route exact path="/contact">
							<Contact />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/profile/:userID">
							<Profile id="userID" />
						</Route>
						<Route exact path="/recover">
							<Recover />
						</Route>
						<Route exact path="/reserve">
							<Reserve />
						</Route>
						<Route>
							<NotFound />
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
