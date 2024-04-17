import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import amateur from '/src/front/img/1.png';

const Profile = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("Profile");
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hiddenTreasures, setHiddenTreasures] = useState([]);
    const [foundTreasures, setFoundTreasures] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [editingUsername, setEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    const changeSection = (section) => {
        setActiveSection(section);
    };

    const fetchUserTreasuresFound = async (userId) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("jwt-token");
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}/found-treasures`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const treasures = await response.json();
            if (response.ok) {
                setFoundTreasures(treasures);
            } else {
                console.error("Error fetching found treasures:", treasures.message);
            }
        } catch (error) {
            console.error("Error fetching found treasures: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserTreasures = async (userId) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("jwt-token");
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}/hide-treasures`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const treasures = await response.json();
            if (response.ok) {
                setHiddenTreasures(treasures);
            } else {
                console.error("Error fetching treasures:", treasures.message);
            }
        } catch (error) {
            console.error("Error fetching treasures: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            fetchUserData();
        }
    }, [navigate]);

    useEffect(() => {
        if (userData) {
            fetchUserTreasures(userData.id);
            fetchUserTreasuresFound(userData.id);
        }
    }, [userData]);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("jwt-token");
            const response = await fetch(`${process.env.BACKEND_URL}/api/current-user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUserData(data);
                fetchStatusByPoints(data.points);
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

    const handleUsernameChange = async () => {
        try {
            const token = localStorage.getItem("jwt-token");
            const response = await fetch(`${process.env.BACKEND_URL}/api/update-username/${userData.id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: newUsername })
            });
            if (response.ok) {
                // Actualizar el estado del nombre de usuario y salir del modo de edición
                setUserData(prevState => ({ ...prevState, username: newUsername }));
                setEditingUsername(false);
            } else {
                console.error("Error updating username");
            }
        } catch (error) {
            console.error("Error updating username: ", error);
        }
    };

    const fetchStatusByPoints = async (points) => {
        try {
            const token = localStorage.getItem("jwt-token");
            const response = await fetch(`${process.env.BACKEND_URL}/api/status-by-points/${points}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const statusData = await response.json();
            if (response.ok) {
                setUserData(prevState => ({ ...prevState, status_name: statusData.name, status_image: statusData.image }));
            } else {
                console.error("Error fetching status by points:", statusData.message);
            }
        } catch (error) {
            console.error("Error fetching status by points: ", error);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        try {
            await uploadProfileImage(file);
        } catch (error) {
            console.error("Error al cargar la imagen: ", error);
            setUploadError('Error uploading the profile image');
        }
        setIsUploading(false);
    };

    const uploadProfileImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "treasure");

        const response = await fetch("https://api.cloudinary.com/v1_1/dxzhssh9m/image/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (!data.secure_url) {
            throw new Error('La URL de la imagen no está disponible.');
        }

        await updateProfileImage(data.secure_url);
        await fetchUserData(); 
    };

    const updateProfileImage = async (imageUrl) => {
        const token = localStorage.getItem("jwt-token");
        const response = await fetch(`${process.env.BACKEND_URL}/api/update-profile-image`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ photo: imageUrl })
        });

        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue OK.');
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
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
                                    <img src={userData && userData.photo ? userData.photo : "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"} alt="Profile" className="photo-user" />
                                    <label htmlFor="file-upload" className="edit-photo-label">Edit photo</label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        onChange={handleImageChange}
                                        disabled={isUploading}
                                        className="file-input"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div className="user-info ps-3">
                                    {editingUsername ? (
                                    <div>
                                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                                        <button onClick={handleUsernameChange}>Save</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="username-text-profile">{userData ? userData.username : "No Username"}</p>
                                        <button onClick={() => setEditingUsername(true)}>Edit</button>
                                    </div>
                                )}
                                    <p className="points-text-profile pb-2">{userData ? userData.points : 0} points</p>
                                    <p className="status-text-profile">
                                        {userData ? userData.status_name : "AMATEUR"}
                                        <img className="image-status-profile ms-3" src={userData && userData.status_image ? userData.status_image : amateur} alt="Status" />
                                    </p>
                                </div>
                            </div>
                            <button className="btn btn-warning mt-3 edit-profile-btn">Edit Profile</button>
                        </>
                    )}
                    {activeSection === "Treasures Activity" && (
                        <div className="treasures-activity">
                            <h2 className="pb-2 title-hide-profile">Found Treasures ({foundTreasures.length})</h2>
                            <table className="table-list-profile">
                                <thead>
                                    <tr className="cabecero-profile">
                                        <th className="image-title-profile">Image</th>
                                        <th className="name-title-profile">Name</th>
                                        <th className="city-title-profile">City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foundTreasures.map(treasure => (
                                        <tr className="elementos-profile" key={treasure.id}>
                                            <td className="image-elements-profile"><img src={treasure.image} alt="Found Treasure" /></td>
                                            <td className="name-elements-profile ps-2">{treasure.name}</td>
                                            <td className="city-elements-profile ps-2">{treasure.city_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h2 className="pb-2 pt-5 title-hide-profile">Hidden Treasures ({hiddenTreasures.length})</h2>
                            <table className="table-list-profile">
                                <thead>
                                    <tr className="cabecero-profile">
                                        <th className="image-title-profile">Image</th>
                                        <th className="name-title-profile">Name</th>
                                        <th className="city-title-profile">City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hiddenTreasures.map(treasure => (
                                        <tr className="elementos-profile" key={treasure.id}>
                                            <td className="image-elements-profile"><img src={treasure.image} alt="Found Treasure" /></td>
                                            <td className="name-elements-profile ps-2">{treasure.name}</td>
                                            <td className="city-elements-profile ps-2">{treasure.city_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-center pt-2 pb-2">
                {uploadError && <p className="text-danger">{uploadError}</p>}
            </div>
        </div>
    );
};

export default Profile;
