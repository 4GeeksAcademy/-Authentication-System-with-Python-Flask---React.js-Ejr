import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoGame from "/src/front/img/logo.png";

export const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("jwt-token");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-dark bg-black bg-light pe-5">
            <Link to="/">
                <img src={logoGame} alt="logo" className="imageLogo"/>
            </Link>
            <Link to="/lista-tesoros" className="navbar-brand mb-0 h1" title="TREASURES">
                <i className="fas fa-search icon"></i><span className="link-text">TREASURES</span>
            </Link>
            <Link to="/formulario-tesoro" className="navbar-brand mb-0 h1" title="HIDE YOUR TREASURE">
                <i className="fas fa-eye-slash icon"></i><span className="link-text">HIDE YOUR TREASURE</span>
            </Link>
            <Link to="/rankings" className="navbar-brand mb-0 h1" title="RANKINGS">
                <i className="fas fa-trophy icon"></i><span className="link-text">RANKINGS</span>
            </Link>
            <Link to="/perfil" className="navbar-brand mb-0 h1" title="PROFILE">
                <i className="fas fa-user icon"></i><span className="link-text">PROFILE</span>
            </Link>
			<div className="ml-auto">
				<div style={{ display: "inline-block", marginRight: "10px" }}>
					<Link to="/registro" className="nav-link">
						<button className="btn btn-warning">Create your account</button>
					</Link>
				</div>
				<div style={{ display: "inline-block", marginRight: "10px" }}>
					<Link to="/login" className="nav-link text-warning">Login</Link>
				</div>
				<div style={{ display: "inline-block" }}>
					<button className="btn btn-link text-danger" onClick={logout}>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};