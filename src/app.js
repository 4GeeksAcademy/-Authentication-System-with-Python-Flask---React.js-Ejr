import React from "react";
import { createRoot } from 'react-dom/client'

import Layout from "./frontend/js/layout"

import "./frontend/styles/tailwind.css"

const root = createRoot(document.getElementById('app'))
root.render(<Layout />);
