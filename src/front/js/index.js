//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
//include your index.scss file into the bundle
import "../styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";

//import your own components
import Layout from "./layout";


//render your react application
ReactDOM.render(
  
<Auth0Provider domain="dev-jn28kitn.us.auth0.com" clientId="93CbImRpAW5FYzOe2B2BsI2w7GzAJeRH" redirectUri={window.location.origin}>
  <ChakraProvider>
    <Layout />
  </ChakraProvider>
  </Auth0Provider>
  ,
  document.querySelector("#app")
);
