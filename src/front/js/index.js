import React from "react";
import ReactDOM from "react-dom/client"; // Cambiado de 'react-dom' a 'react-dom/client'
import "../styles/index.css";
import Layout from "./layout";

const root = ReactDOM.createRoot(document.querySelector("#app")); // Crear el root
root.render(<Layout />); // Renderizar el componente Layout
