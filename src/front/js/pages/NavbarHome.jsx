import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarHome.module.css";
import Momentum from "../../img/MOMENTUM360-10.png";

const menuItems = [
    { id: "/", name: "Home" },
    { id: "/imageSlider", name: "About Us" },
    { id: "/PricingPlans", name: "Pricing Plans" },
    { id: "/calendar", name: "Calendar" },
    { id: "/login", name: "Login" },
];

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <Link
                        key={item.id}
                        to={item.id}
                        className={`${styles.navLink} ${styles.navLinkAnimation}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className={styles.menuToggle} onClick={toggleMenu}>
                <div className={`${styles.bar} ${menuOpen ? styles.change : ""}`}></div>
            </div>
        </div>
    );
};

export default Navbar;
