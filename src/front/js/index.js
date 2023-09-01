//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import ContactForm from "./component/ContactForm.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";



//render your react application
ReactDOM.render(<AccountPage/>, document.querySelector("#app"));
