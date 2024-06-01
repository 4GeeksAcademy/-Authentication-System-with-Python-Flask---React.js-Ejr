import React, { useState, useEffect, useContext } from 'react';
import { Offcanvas, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import styles from './Sidebar.module.css';

import EditProfile from './EditProfile.jsx';
import UserDataDetail from './UserDataDetail.jsx';
import UserBooking from './UserBooking.jsx';
import MembershipPurchase from './MembershipPurchase.jsx';
import ProfileImageUpload from './ProfileImageUpload.jsx';

const Sidebar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true); // Collapsed by default

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        const body = document.body;
        if (collapsed) {
            body.classList.add('collapsed');
        } else {
            body.classList.remove('collapsed');
        }
    }, [collapsed]);


    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const result = await actions.validateToken(token);
                // console.log(result);
                if (!result.isAuthenticated) {
                    navigate('/');
                }
            } else {
            }
        };
        checkAuthStatus();
    }, []);

    const handleCloseSession = async () => {
        await actions.closeSession();
        navigate('/');
    };

    const profileImageUrl = store.uploadedUserData.profile_image_url;

    return (
        <nav className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
             <div className={styles.sidebarTop}>
                <div className={styles.profileContainer}>
                    {profileImageUrl ? (
                        <>
                            <img
                                src={profileImageUrl}
                                alt="Profile"
                                className={`${styles.logo} ${collapsed ? styles.hide : ''}`}
                            />
                            <img
                                src={profileImageUrl}
                                alt="Profile"
                                className={`${styles.logoSmall} ${collapsed ? '' : styles.hide}`}
                            />
                        </>
                    ) : (
                        <>
                            <i className={`fa-regular fa-user ${styles.logo} ${collapsed ? styles.hide : ''}`}></i>
                            <i className={`fa-regular fa-user ${styles.logoSmall} ${collapsed ? '' : styles.hide}`}></i>
                        </>
                    )}
                    <span className={`${styles.userName} ${collapsed ? styles.hide : ''}`}>
                        Welcome! <strong>{store.uploadedUserData.name}</strong>
                    </span>
                </div>
            </div>
            <div className={styles.iconProfile}>
                <MembershipPurchase />
                <ProfileImageUpload />
                <EditProfile />
            </div>
            <span className={`${styles.icon} ${collapsed ? '' : styles.hide}`}>
            <Button onClick={handleCloseSession} className={styles.ButtonHome} title='When you return home your session will be closed'>
            <i className="fa-solid fa-house"></i>
                </Button>
            </span>

            <div className={styles.scrollableContent}>
            <span className={`${styles.link} ${collapsed ? styles.hide : ''}`}>
             <UserDataDetail />
            <UserBooking />
            </span>
            </div>

            {/* <div className={styles.scrollableContent}>
                <div className={styles.sidebarLinks}>
                    <ul>
                        <li>
                            <a href="#home" title="Home" className={styles.tooltip}>
                                <span className={`${styles.link} ${collapsed ? styles.hide : ''}`}>
                                    <i className="fa-solid fa-house"></i> Home
                                </span>
                                <span className={`${styles.icon} ${collapsed ? '' : styles.hide}`}>
                                    <i className="fa-solid fa-house"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <span className={`${styles.link} ${collapsed ? styles.hide : ''}`}>
                                <UserDataDetail />
                                <UserBooking />
                            </span>
                        </li>
                    </ul>
                </div>
            </div> */}
            {/* <div className={`${styles.sidebarBottom} ${collapsed ? styles.hide : ''}`}>
                <img
                    src="https://st4.depositphotos.com/4347949/20418/i/450/depositphotos_204189710-stock-photo-crossfit-kettlebell-training-gym-athlete.jpg"
                    alt="Diamond"
                />
                <p>Welcome to Laplace Diamond club!</p>
                <button>Explore Benefits</button>
            </div> */}
            <div className={styles.expandBtn} onClick={handleToggle}>
                <img
                    src="https://www.svgrepo.com/show/379887/collapse-right.svg"
                    alt="Left Collapse"
                />
                <span className={`${styles.link} ${collapsed ? styles.hide : ''}`}>
                <Button onClick={handleCloseSession} className={styles.ButtonCloseSession}>
                <i class="fa-solid fa-power-off"></i> Sign off
                </Button>
                </span>
            </div>
        </nav>
    );
};

export default Sidebar;
