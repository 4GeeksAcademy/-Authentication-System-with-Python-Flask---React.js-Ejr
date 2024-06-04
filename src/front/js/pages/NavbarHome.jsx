import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavbarHome.module.css";
import Momentum from "../../img/MOMENTUM360-10.png";

const menuItems = [
    { id: "image-slider", name: "About Us", type: "anchor" },
    { id: "pricing-plans", name: "Pricing Plans", type: "anchor" },
    { id: "contact", name: "Contact", type: "anchor" },
    { id: "/calendar", name: "Calendar", type: "link" },
    { id: "/login", name: "Login", type: "link" },
];

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        setIsSticky(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleNavLinkClick = (event, item) => {
        event.preventDefault();
        setMenuOpen(false);
        if (item.type === "anchor") {
            const section = document.getElementById(item.id);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else if (item.type === "link") {
            navigate(item.id);
        }
    };

    return (
        <div className={`${styles.navbar} ${isSticky ? styles.sticky : ""}`}>
            <div className={styles.logoContainer}>
                <Link to="/">
                    <img
                        src={Momentum}
                        alt="Momentum 360"
                        className={`${styles.logo} ${styles.logoAnimation}`}
                    />
                </Link>
            </div>
            <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
                {menuItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.type === "anchor" ? `#${item.id}` : item.id}
                        className={`${styles.navLink} ${styles.navLinkAnimation}`}
                        onClick={(e) => handleNavLinkClick(e, item)}
                    >
                        {item.name}
                    </a>
                ))}
            </nav>
            <div className={styles.menuToggle} onClick={toggleMenu}>
                <div className={`${styles.bar} ${menuOpen ? styles.change : ""}`}></div>
            </div>
        </div>
    );
};

export default Navbar;
