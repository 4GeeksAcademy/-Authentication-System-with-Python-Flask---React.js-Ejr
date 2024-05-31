import React from "react";
import { createRoot } from 'react-dom/client'

import Layout from "./frontend/js/layout"

import "./frontend/styles/tailwind.css"
import "./frontend/styles/styles.css"

const main = createRoot(document.getElementById('main'))
main.render(<Layout />);

