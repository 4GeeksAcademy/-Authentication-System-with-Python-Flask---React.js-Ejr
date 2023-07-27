import React from "react";
import { Link } from "react-router-dom";
import Styles from "../views/styles/footer.css"
// import { useNavigate } from "react-router-dom";

// import { Context } from '../store/appContext.js';



const Footer = () => {

    return (
        <div>
            <footer className="row row-cols-5 py-5 my-5 border-top footerMain">
                <div className="col">
                    <ul className="nav flex-row listaFooter">
                        <Link className="navbar-brand" to="/">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                        </Link>
                        <Link className="navbar-brand" to="/">
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
                        </Link>
                        <Link className="navbar-brand" to="/">
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Help</a></li>
                        </Link>
                        <Link className="navbar-brand" to="/">
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About us</a></li>
                        </Link>
                    </ul>
                    <div className="col">
                        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-instagram" style={{ marginRight: '20px' }}></i>
                            </a>
                            <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Flogin%3Flang%3Den" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-twitter" style={{ marginRight: '20px' }}></i>
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-facebook-f" style={{ marginRight: '20px' }}></i>
                            </a>
                        </ul>
                    </div>
                    <div className="col">
                        <p className="text-muted">© 2023</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;