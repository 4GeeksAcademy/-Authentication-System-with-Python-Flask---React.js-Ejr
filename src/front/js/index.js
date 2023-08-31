//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import ContactForm from "./component/ContactForm.jsx";
import ContactPage from "./pages/ContactPage.jsx";



//render your react application
ReactDOM.render(<ContactPage/>, document.querySelector("#app"));
