import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext";
import amateur from '/src/front/img/1.png';

const foundTreasures = [
    { imageUrl: "https://media.istockphoto.com/id/636783196/es/foto/5-billetes-en-euros.jpg?s=612x612&w=0&k=20&c=Mti9s5mpdMQpyI_yCmIR7azvmrZhLmwKkFxgVgNGc_E=", name: "Billete", description: "Billete de 5€", city: "Valencia", findUrl: "" },
];
const hiddenTreasures = [
    { imageUrl: "https://www.superchuches.com/11642-thickbox_default/chicles-trident-max-fresa.jpg", name: "Chicles", description: "Paquete de chicles Trident", city: "Sevilla", findUrl: "" },
];

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
                        <>
                            <div className="my-profile">
                                <div className="photo-container">
                                    <img src="https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png" alt="Profile Photo" className="photo-user" />
                                </div>
                                <div className="user-info ps-3">
                                    <p className="status-text-profile"><img className="image-status-profile me-3" src={amateur} alt="nombre_imagen_2" />AMATEUR</p>
                                    <p className="points-text-profile pb-2">20 points</p>
                                    <p className="username-text-profile">Username</p>
                                </div>
                            </div>
                            <button className="btn btn-warning mt-3 edit-profile-btn">Edit Profile</button>
                        </>
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
                                    {foundTreasures.map((treasure, index) => (
                                        <tr className="elementos-profile" key={index}>
                                            <td className="image-elements-profile"><img src={treasure.imageUrl} alt="Tesoro" /></td>
                                            <td className="name-elements-profile ps-2">{treasure.name}</td>
                                            <td className="description-elements-profile ps-2">{treasure.description}</td>
                                            <td className="city-elements-profile ps-2">{treasure.city}</td>
                                        </tr>
                                    ))}
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
                                    {hiddenTreasures.map((treasure, index) => (
                                        <tr className="elementos-profile" key={index}>
                                            <td className="image-elements-profile"><img src={treasure.imageUrl} alt="Tesoro" /></td>
                                            <td className="name-elements-profile ps-2">{treasure.name}</td>
                                            <td className="description-elements-profile ps-2">{treasure.description}</td>
                                            <td className="city-elements-profile ps-2">{treasure.city}</td>
                                        </tr>
                                    ))}
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
