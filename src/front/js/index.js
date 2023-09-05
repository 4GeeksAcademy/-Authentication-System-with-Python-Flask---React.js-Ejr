//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import ContactForm from "./component/ContactForm.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import { Home } from "./pages/home.js";



//render your react application
ReactDOM.render(<Home/>, document.querySelector("#app"));
