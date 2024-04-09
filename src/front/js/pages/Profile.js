import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import amateur from '/src/front/img/1.png';

const Profile = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("Profile");
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const changeSection = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            fetchUserData();
        }
    }, [navigate]);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("jwt-token");
            const response = await fetch( process.env.BACKEND_URL + '/api/current-user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUserData(data);
                console.log("User data fetched successfully:", data);
            } else {
                console.error("Error fetching user data:", data.message);
                setUserData({});
            }
        } catch (error) {
            console.error("Error fetching user data: ", error);
            setUserData({});
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return <div>Loading...</div>; 
    }

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
                                    <img src={userData.profilePhoto || "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"} alt="Profile" className="photo-user" />
                                </div>
                                <div className="user-info ps-3">
                                    <p className="username-text-profile">{userData.username || "No Username"}</p>
                                    <p className="points-text-profile pb-2">{userData.points || 0} points</p>
                                    <p className="status-text-profile">
                                        {userData.status_id || "AMATEUR"}
                                        <img className="image-status-profile ms-3" src={amateur} alt="Status" />
                                    </p>
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
                                        <th className="city-title-profile">City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="elementos-profile">
                                        <td className="image-elements-profile"><img src="T" alt="Treasure" /></td>
                                        <td className="name-elements-profile ps-2"></td>
                                        <td className="city-elements-profile ps-2"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2 className="pb-2 pt-5 title-hide-profile">Hidden Treasures</h2>
                            <table className="table-list-profile">
                                <thead>
                                    <tr className="cabecero-profile">
                                        <th className="image-title-profile">Image</th>
                                        <th className="name-title-profile">Name</th>
                                        <th className="city-title-profile">City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="elementos-profile" >
                                        <td className="image-elements-profile"><img src="t" alt="Hidden Treasure" /></td>
                                        <td className="name-elements-profile ps-2"></td>
                                        <td className="city-elements-profile ps-2"></td>
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
