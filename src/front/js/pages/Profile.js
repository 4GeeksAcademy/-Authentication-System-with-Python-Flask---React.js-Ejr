import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext";
import amateur from '/src/front/img/1.png';

const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("Profile");
    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
        }
    }, [navigate, actions]);

    const changeSection = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="profile-page text-center">
            <div className="profile-cont pt-5">
                <div className="sidebar">
                    <ul>
                        <li className={activeSection === "Profile" ? "active" : ""} onClick={() => changeSection("Profile")}>Profile</li>
                        <li className={activeSection === "Treasures Activity" ? "active" : ""} onClick={() => changeSection("Treasures Activity")}>Treasures Activity</li>
                    </ul>
                </div>
                <div className="content">
                    {activeSection === "Profile" && (
                        <div className="my-profile">
                            <div className="photo-container">
                                <img src="https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png" alt="Profile Photo" className="photo-user" style={{ height: "200px", width: "200px" }} />
                            </div>
                            <div className="user-info ps-3">
                                <p className="username-text-profile">Username</p>
                                <p className="points-text-profile pb-5">0 points</p>
                                <p className="status-text-profile"><img className="image-status-profile me-3" src={amateur} alt="nombre_imagen_2" />AMATEUR</p>
                            </div>
                        </div>
                    )}

                    {activeSection === "Treasures Activity" && (
                        <div className="treasures-activity">
                            <h2 className="pb-2 title-hide-profile">Found Treasures</h2>
                            <table className="table-list-profile">
                                <thead>
                                    <tr className="cabecero-profile">
                                        <th className="image-title-profile">Image</th>
                                        <th className="name-title-profile">Name</th>
                                        <th className="description-title-list-profile">Description</th>
                                        <th className="city-title-profile">City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="elementos-profile">
                                        <td className="image-elements-profile"><img src="" alt="Tesoro" /></td>
                                        <td className="name-elements-profile">Name</td>
                                        <td className="description-elements-profile">Description</td>
                                        <td className="city-elements-profile">City</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2 className="pb-2 pt-5 title-hide-profile">Hidden Treasures</h2>
                            <table className="table-list-profile">
                                <thead>
                                    <tr className="cabecero-profile">
                                        <th className="image-title-profile">Image</th>
                                        <th className="name-title-profile">Name</th>
                                        <th className="description-title-list-profile">Description</th>
                                        <th className="city-title-profile">City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="elementos-profile">
                                        <td className="image-elements-profile"><img src="" alt="Tesoro" /></td>
                                        <td className="name-elements-profile">Name</td>
                                        <td className="description-elements-profile">Description</td>
                                        <td className="city-elements-profile">City</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
