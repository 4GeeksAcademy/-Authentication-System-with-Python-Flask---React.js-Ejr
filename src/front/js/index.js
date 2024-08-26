import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter

// Include your index.css file into the bundle
import "../styles/index.css";

// Import your own components
import Layout from "./layout";

// Render your React application
ReactDOM.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>,
  document.querySelector("#app")
);
