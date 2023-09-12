//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";
import UserProfile from "./component/perfil";
import Userpage from "./pages/perfil";


//render your react application
ReactDOM.render(<Layout/>, document.querySelector("#app"));
