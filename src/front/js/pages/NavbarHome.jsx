import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarHome.module.css";

const menuItems = [
    { id: "/", name: "Home" },
    { id: "/imageSlider", name: "About Us" },
    { id: "/PricingPlans", name: "Pricing Plans" },
    { id: "/calendar", name: "Calendar" },
    { id: "/login", name: "Login" },
];

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        setIsSticky(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`${styles.navbar} ${isSticky ? styles.sticky : ""}`}>
            <div className={styles.logoContainer}>
                <Link to="/">
                    <h1 className={`${styles.logo} ${styles.logoAnimation}`}>
                        Momentum 360
                    </h1>
                </Link>
            </div>
            <nav className={styles.navLinks}>
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.id}
                        className={`${styles.navLink} ${styles.navLinkAnimation}`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Navbar;