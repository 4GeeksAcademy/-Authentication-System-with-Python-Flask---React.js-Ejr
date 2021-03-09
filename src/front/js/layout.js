import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";

// Contenido Publico
import { NavLogin } from "./component/navlogin";
import { Login } from "./pages/login";
import { FooLogin } from "./component/foologin";

//Contenido Privado
import { Navbar } from "./component/navbar";
import { Home } from "./pages/home";
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
					<Switch>
						<Route exact path="/">
							<NavLogin />
							<Login />
							<FooLogin />
						</Route>
						<Route exact path="/home">
							<Navbar />
							<Home />
							<Footer />
						</Route>
						{/* <Route exact path="/demo">
							<Demo />
						</Route> */}
						{/* <Route exact path="/single/:theid">
							<Single />
						</Route> */}
						{/* <Route>
							<h1>Not found!</h1>
						</Route> */}

                       
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
//Comentario
