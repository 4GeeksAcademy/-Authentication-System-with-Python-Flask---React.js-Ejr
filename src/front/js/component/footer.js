import React from "react";
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

  
    if (location.pathname !== "/login" && location.pathname !== "/register") {
        return (
            <footer className="footer mt-auto py-3 text-center">
                <p>
                    Made with <i className="fa fa-heart text-danger" /> by{" "}
                    <a href="http://www.4geeksacademy.com">4Geeks Academy</a>
                </p>
            </footer>
        );
    } else {
        return null; 
    }
};

export default Footer;
