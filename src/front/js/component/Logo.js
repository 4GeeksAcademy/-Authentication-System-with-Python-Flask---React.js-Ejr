import React from 'react';
import { Link } from 'react-router-dom';


// Poner Logo
const Logo = () => {
    return (
        <Link to="/" className="logo-wrap col-3">
            <img src="/front/img/logo.png" alt="Recommend me a Book" />
        </Link>
    );
}

export default Logo;