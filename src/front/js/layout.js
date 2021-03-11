import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { LandingPage } from "./pages/landingPage";
import { ContactoView } from "./pages/contacto";
import { CaracteristicasView } from "./pages/caracteristicas";
import { PreciosView } from "./pages/precios";
import injectContext from "./store/appContext";

//folder popUpsLandingPage
import { Login } from "./component/popUpsLandingPage/login";
import { SignUp } from "./component/popUpsLandingPage/signUp";
import { Recovery } from "./component/popUpsLandingPage/recovery";
import { VerifyMessage } from "./component/popUpsLandingPage/verifyMessage";

// folder component
import { NewCostumer } from "./component/newCostumer";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Sidebar from "./component/Sidebar";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					{/* <Navbar /> */}
					<Sidebar />
					<Switch>
						<Route exact path="/">
							<LandingPage />
						</Route>
						<Route exact path="/contacto">
							<ContactoView />
						</Route>
						<Route exact path="/caracteristicas">
							<CaracteristicasView />
						</Route>
						<Route exact path="/precios">
							<PreciosView />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route exact path="/newCostumer">
							<NewCostumer />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signUp">
							<SignUp />
						</Route>
						<Route exact path="/recovery">
							<Recovery />
						</Route>
						<Route exact path="/verifyMessage">
							<VerifyMessage />
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
