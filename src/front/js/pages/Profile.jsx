import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import switchIcon from '../../img/switch.png';
import playstationIcon from '../../img/playstation.png';
import xboxIcon from '../../img/xbox.png';
import steamIcon from '../../img/steam.png';
import discordIcon from '../../img/discord.png';
import epicIcon from '../../img/epic.png';
import '../../styles/profile.css';

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(store.user || {
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        age: '',
        region: '',
        timezone: '',
        languages: '',
        xbox: '',
        psn: '',
        steam: '',
        discord: '',
        nintendo: '',
        epic_id: '',
        bio: '',
        gender: '',
        url_image: '' // Añadir url_image al estado inicial
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const platforms = [
        { name: 'Xbox', icon: xboxIcon },
        { name: 'PSN', icon: playstationIcon },
        { name: 'Steam', icon: steamIcon },
        { name: 'Discord', icon: discordIcon },
        { name: 'Switch', icon: switchIcon },
        { name: 'Epic ID', icon: epicIcon }
    ];
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);


    
    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                navigate('/login'); // Redirige si no hay userId en localStorage
                return;
            }
            const userData = await actions.getProfile(); // Llama a la acción para obtener los datos del perfil
            if (userData) {
                setProfileData(userData); // Actualiza el estado local con los datos obtenidos
            } else {
                navigate('/login'); // Redirige si no se pudieron obtener los datos del usuario
            }
        };
        fetchProfile(); // Ejecuta la función para obtener los datos del perfil al montar el componente
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };


    const handleImageUpload = async () => {
        if (!imageFile) {
            setError('No file selected.');
            return;
        }
        setError(null);
        try {
            const imageUrl = await actions.uploadImageToCloudinary(imageFile);
            if (!imageUrl) {
                throw new Error('Failed to upload image to Cloudinary');
            }
            const updatedProfileData = { ...profileData, url_image: imageUrl };
            const success = await actions.updateProfile(updatedProfileData);
            if (success) {
                setProfileData(updatedProfileData);
                setImageFile(null); // Clear the selected file
            } else {
                throw new Error('Failed to update profile with new image.');
            }
        } catch (error) {
            setError(error.message || 'An unexpected error occurred.');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            let updatedProfileData = { ...profileData };

            if (imageFile) {
                const imageUrl = await actions.uploadImageToCloudinary(imageFile);
                if (!imageUrl) {
                    throw new Error('Failed to upload image to Cloudinary');
                }
                updatedProfileData.url_image = imageUrl;
            }

            const success = await actions.updateProfile(updatedProfileData);
            if (success) {
                const updatedProfile = await actions.getProfile(); // Fetch the profile again after update
                localStorage.setItem('username', updatedProfile.username); // Update username in localStorage
                setProfileData(updatedProfile);
                setIsEditing(false);
            } else {
                setError('Failed to update profile. Please try again.');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    //------DELETING PROFILE HANDLERS-------------------------------------------------------------------------------------------------

    // Abre el modal de confirmación
    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    // Maneja la confirmación de la eliminación
    const handleConfirmDelete = async () => {
        try {
            const success = await actions.deleteProfile();
            if (success) {
                navigate('/signup');  // Navega al signup tras eliminar el perfil
                setShowConfirmModal(false);  // Cierra el modal
            } else {
                setError('Failed to delete profile. Please try again.');
                setShowConfirmModal(false);  // Asegura cerrar el modal incluso si hay error
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            setShowConfirmModal(false);  // Cierra el modal en caso de error
        }
    };

    // Cierra el modal sin realizar acciones
    const handleCloseModal = () => {
        setShowConfirmModal(false);
    };

    //-------------------------------------------------------------------------------------------------------------------------------------

    return (
        <div className="container mt-3 profile-container">
            <h6>Profile Settings</h6>
            <div className="mb-3 row">
                {profileData.url_image && (
                    <img src={profileData.url_image} alt="Profile" className="profile-image mb-3" />
                )}
                <div className="col">
                    {!editingImage && (
                        <button className="btn btn-primary" onClick={handleEditPictureClick}>
                            Edit Profile Picture
                        </button>
                    )}
                    {editingImage && !imageFile && (
                        <>
                            <input
                                type="file"
                                id="fileInput"
                                name="image"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                className="form-control"
                            />
                            <button className="btn btn-secondary" onClick={() => document.getElementById('fileInput').click()}>
                                Choose New Profile Picture
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancelEditing}>
                                Cancel Editing Profile Picture
                            </button>
                        </>
                    )}
                    {imageFile && (
                        <>
                            <span className="ms-2">{imageFile.name}</span>
                            <button className="btn btn-primary" onClick={handleImageUpload}>
                                Save Profile Picture
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancelEditing}>
                                Cancel Editing Profile Picture
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div>
                <div className="row">
                    {/** Username and Email */}
                    <div className="mb-3 col-6">
                        <label>Username:</label>
                        <input type="text" value={profileData.username} readOnly={!isEditing} className="form-control" />
                    </div>
                    <div className="mb-3 col-6">
                        <label>
                            {isEditing ? "You cannot change your email address" : "Email:"}
                        </label>
                        <input
                            type="text"
                            value={profileData.email}
                            readOnly // Este campo siempre es de solo lectura
                            className="form-control"
                        />
                    </div>
                </div>
                {/** First Name and Last Name */}
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>First Name:</label>
                        <input type="text" value={profileData.first_name} readOnly={!isEditing} className="form-control" />
                    </div>
                    <div className="mb-3 col-6">
                        <label>Last Name:</label>
                        <input type="text" value={profileData.last_name} readOnly={!isEditing} className="form-control" />
                    </div>
                </div>
                {/** Password and Age */}
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>Password:</label>
                        <input type="text" value={profileData.password} readOnly={!isEditing} className="form-control" />
                    </div>
                    <div className="mb-3 col-6">
                        <label>Age:</label>
                        <input type="text" value={profileData.age} readOnly={!isEditing} className="form-control" />
                    </div>
                </div>
                {/** Gender and Bio */}
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>Gender:</label>
                        <input type="text" value={profileData.gender} readOnly={!isEditing} className="form-control" />
                    </div>
                    <div className="mb-3 col-6">
                        <label>Bio:</label>
                        <textarea value={profileData.bio} readOnly={!isEditing} className="form-control"></textarea>
                    </div>
                </div>
                {/** Gaming Profiles */}
                <div className="row">
                    {platforms.map((platform, index) => (
                        <div className="mb-3 col-4" key={index}>
                            <label>
                                <img src={platform.icon} alt={platform.name} style={{ width: '24px', marginRight: '10px' }} />
                            </label>
                            <input
                                type="text"
                                value={profileData[platform.name.replace(/\s/g, '').toLowerCase()]}
                                readOnly={!isEditing}
                                className="form-control mb-3"
                            />
                        </div>
                    ))}
                </div>
                {/** Other Details */}
                <div className="row">
                    {["Region", "Timezone", "Languages"].map((detail, index) => (
                        <div className="mb-3 col-4" key={index}>
                            <label className="me-2">{detail}:</label>
                            <input type="text" value={profileData[detail.toLowerCase()]} readOnly={!isEditing} className="form-control mb-3" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-end">
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                        Edit Profile
                    </button>
                )}
                {isEditing && (
                    <div className="d-flex justify-content-between">
                        <div>
                            <button onClick={handleDeleteClick} className="btn btn-danger">
                                Delete Profile
                            </button>
                            {showConfirmModal && (
                                <div className="modal show" style={{ display: 'block' }}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Confirm Deletion</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <button onClick={() => {
                                // Aquí debe ir el código para guardar los cambios
                                // setIsEditing(false) puede llamarse después de actualizar los datos correctamente
                            }} className="btn btn-primary me-2">
                                Update Profile
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="btn btn-danger">
                                Cancel Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );

};
