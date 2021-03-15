import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";

// Contenido Publico
import { NavLogin } from "./component/navlogin";
import { Presentation } from "./component/presentation";
import { AboutUs } from "./component/aboutus";
import { Content } from "./component/content";
import { Login } from "./component/login";

//Contenido Privado
// Primera Vista
import { Navbar } from "./component/navbar";
import { Home } from "./pages/home";
import { Base_Categories } from "./component/base_categories";
import { Footer } from "./component/footer";

// Segunda Vista
import { Info_Category } from "./component/info_category";
// comentarios
// Tercera Vista
import { Cocktails } from "./component/Cocktails";

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
							<Presentation />
							<AboutUs />
							<Content />
							<Login />
							<Footer />
						</Route>
						<Route exact path="/home">
							<Navbar />
							<Home />
							<Base_Categories />
							<Footer />
						</Route>
						<Route exact path="/base">
							<Navbar />
							<Info_Category />
							<Footer />
						</Route>
						<Route exact path="/cocktails">
							<Navbar />
							<Cocktails />
							<Footer />
						</Route>
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
