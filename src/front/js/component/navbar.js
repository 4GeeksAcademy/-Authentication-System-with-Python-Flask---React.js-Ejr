import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  return (
    <>
      <nav className="navbar">
      <div>
      <Link to= "/"><h1 className="logo">Liz Shoes <i className="fa-brands fa-shopify"></i></h1></Link>
      </div>
        {isAuthenticate ? <AutnGadgeth /> : <SingupAndLogin />}
      </nav>
    </>
  );
};


const SingupAndLogin = () => {
  return (
    <>
      <div className="d-flex gap-4">
        <button className="button-light">
          <Link to="/login">Ingresar</Link>
        </button>
        <button className="button-dark">
         <Link to= "/signup">Regístrate</Link>
        </button>
      </div>
    </>
  );
};

const AutnGadgeth = () => {
  return (
    <>
      <div>
        <h1>hello</h1>
        <span>something</span>
      </div>
    </>
  );
};
