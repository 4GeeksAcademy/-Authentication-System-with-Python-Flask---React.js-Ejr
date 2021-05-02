import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Provincia } from "./pages/provincia";
import { Alajuela } from "./pages/alajuela";
import { Cartago } from "./pages/cartago";
import { Puntarenas } from "./pages/puntarenas";
import { Sanjose } from "./pages/sanjose";
import { Guanacaste } from "./pages/guanacaste";
import { Limon } from "./pages/limon";
import { Heredia } from "./pages/heredia";
import { Single } from "./pages/single";
import { Registropymes } from "./pages/registropymes";
import { Actualizardatos } from "./pages/actualizardatos";
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
						<Route exact path="/" component={Home} />
						<Route exact path="/home" component={Home} />
						<Route exact path="/provincia" component={Provincia} />
						<Route exact path="/alajuela" component={Alajuela} />
						<Route exact path="/heredia" component={Heredia} />
						<Route exact path="/guanacaste" component={Guanacaste} />
						<Route exact path="/sanjose" component={Sanjose} />
						<Route exact path="/puntarenas" component={Puntarenas} />
						<Route exact path="/limon" component={Limon} />
						<Route exact path="/cartago" component={Cartago} />
						<Route exact path="/registropymes" component={Registropymes} />
						<Route exact path="/actualizardatos" component={Actualizardatos} />
						<Route exact path="/single/:theid" component={Single} />
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
