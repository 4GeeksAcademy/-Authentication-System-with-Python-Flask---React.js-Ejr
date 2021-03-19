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
import { NavFav } from "./component/navfav";
// import { Info_Category } from "./component/info_category";
import { Info_WithoutBase } from "./component/info_withoutBase";
import { Info_Rum } from "./component/info_rum";
import { Info_Gin } from "./component/info_gin";
import { Info_Vodka } from "./component/info_vodka";
import { Info_Tequila } from "./component/info_tequila";
import { Info_Whisky } from "./component/info_whisky";

// comentarios
// Tercera Vista
// utiliza NavFav
import { Cocktail_nonAlcohol } from "./component/cocktail_noalcohol";
import { Cocktail_Rum } from "./component/cocktail_rum";
// import { Cocktail_Vodka } from "./component/cocktail_vodka";
// import { Cocktail_Tequila } from "./component/cocktail_tequila";
// import { Cocktail_Whisky } from "./component/cocktail_whisky";
// import { Cocktail_Gin } from "./component/cocktail_gin";

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
						<Route exact path="/Info_WithoutBase">
							<NavFav />
							<Info_WithoutBase />
							<Footer />
						</Route>
						<Route exact path="/info_Rum">
							<NavFav />
							<Info_Rum />
							<Footer />
						</Route>
						<Route exact path="/info_Gin">
							<NavFav />
							<Info_Gin />
							<Footer />
						</Route>
						<Route exact path="/info_Vodka">
							<NavFav />
							<Info_Vodka />
							<Footer />
						</Route>
						<Route exact path="/info_Tequila">
							<NavFav />
							<Info_Tequila />
							<Footer />
						</Route>
						<Route exact path="/info_Whisky">
							<NavFav />
							<Info_Whisky />
							<Footer />
						</Route>
						<Route exact path="/Cocktail_nonAlcohol/:theid">
							<NavFav />
							<Cocktail_nonAlcohol />
							<Footer />
						</Route>
						<Route exact path="/Cocktail_Rum/:theid">
							<NavFav />
							<Cocktail_Rum />
							<Footer />
						</Route>
						{/* <Route exact path="/Cocktail_Vodka/:theid">
							<NavFav />
							<Cocktail_Vodka />
							<Footer />
						</Route>
                        <Route exact path="/Cocktail_Tequila/:theid">
							<NavFav />
							<Cocktail_Tequila />
							<Footer />
						</Route>
                        <Route exact path="/Cocktail_Whisky/:theid">
							<NavFav />
							<Cocktail_Whisky />
							<Footer />
						</Route>
                        <Route exact path="/Cocktail_Gin/:theid">
							<NavFav />
							<Cocktail_Gin />
							<Footer />
						</Route> */}
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
