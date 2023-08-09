import React from "react";
import { Link } from "react-router-dom";
import Styles from "../views/styles/footer.css"

const Footer = () => {
    return (
        <div>
            <footer style={{"--bs-gutter-x":" 0"}} className="row  my-5 border-top bg-black text-light p-2">
                <div className="col">
                    <ul className="nav flex-row listaFooter justify-content-center">
                        <li className="nav-item mb-2">
                            <Link className="nav-link  text-white " to="/">Home</Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link className="nav-link text-white " to="/feactures">Features</Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link className="nav-link  text-white" to="/aboutUs">About us</Link>
                        </li>
                    </ul>
                    <div className="container-fluid d-flex justify-content-between ">
                        <span className="text-white">© 2023</span>
                        <div>
                            <div className="list-unstyled m-0">
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-instagram text-white" style={{ marginRight: '20px' }}></i>
                                </a>
                                <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Flogin%3Flang%3Den" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-twitter text-white" style={{ marginRight: '20px' }}></i>
                                </a>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-facebook-f text-white" style={{ marginRight: '20px' }}></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
