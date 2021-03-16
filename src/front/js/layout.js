import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
import { ViewGeneral } from "./pages/viewGeneral";
import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Recuperar } from "./pages/recuperar";
import { NewPassword } from "./pages/newPassword";

import { PymeView } from "./pages/viewPyme";
import { Comment } from "./component/comment";
import { Jumbotron } from "./component/jumbotron";
import { Barra } from "./component/barra";
import { Footer } from "./component/footer";
import ScrollToTop from "./component/scrollToTop";

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
					<Route exact path="/viewGeneral/:type">
						<ViewGeneral />
					</Route>
					<Route exact path="/viewPyme/:id">
						<PymeView />
					</Route>
					<div
						style={{
							backgroundImage:
								"url('https://wallpapersplanet.net/sites/default/files/costa-rica-wallpapers-36777-877629.png')",
							height: "100%",
							opacity: "0.7"
						}}>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/recuperar">
							<Recuperar />
						</Route>
						<Route exact path="/newPassword">
							<NewPassword />
						</Route>
					</div>
				</Switch>

				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
