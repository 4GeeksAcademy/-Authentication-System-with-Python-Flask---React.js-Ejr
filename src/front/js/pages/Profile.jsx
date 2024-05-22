import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const { store, actions } = useContext(Context);
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
        google_play: '',
        nintendo: '',
        epic_id: '',
        bio: '',
        gender: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.user) {
            navigate('/login');
        } else {
            setProfileData(store.user);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await actions.updateProfile(profileData);
            if (success) {
                await actions.getProfile(); // Fetch the profile again after update
                setIsEditing(false);
            } else {
                setError('Failed to update profile. Please try again.');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            const success = await actions.deleteProfile();
            if (success) {
                navigate('/signup');
            } else {
                setError('Failed to delete profile. Please try again.');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            {!isEditing ? (
                <div>
                    <p>Email: {profileData.email}</p>
                    <p>Username: {profileData.username}</p>
                    <p>First Name: {profileData.first_name}</p>
                    <p>Last Name: {profileData.last_name}</p>
                    <p>Age: {profileData.age}</p>
                    <p>Region: {profileData.region}</p>
                    <p>Timezone: {profileData.timezone}</p>
                    <p>Languages: {profileData.languages}</p>
                    <p>Xbox: {profileData.xbox}</p>
                    <p>PSN: {profileData.psn}</p>
                    <p>Steam: {profileData.steam}</p>
                    <p>Google Play: {profileData.google_play}</p>
                    <p>Nintendo: {profileData.nintendo}</p>
                    <p>Epic ID: {profileData.epic_id}</p>
                    <p>Bio: {profileData.bio}</p>
                    <p>Gender: {profileData.gender}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleInputChange}
                    />
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={profileData.first_name}
                        onChange={handleInputChange}
                    />
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={profileData.last_name}
                        onChange={handleInputChange}
                    />
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={profileData.age}
                        onChange={handleInputChange}
                    />
                    <label>Region:</label>
                    <input
                        type="text"
                        name="region"
                        value={profileData.region}
                        onChange={handleInputChange}
                    />
                    <label>Timezone:</label>
                    <input
                        type="text"
                        name="timezone"
                        value={profileData.timezone}
                        onChange={handleInputChange}
                    />
                    <label>Languages:</label>
                    <input
                        type="text"
                        name="languages"
                        value={profileData.languages}
                        onChange={handleInputChange}
                    />
                    <label>Xbox:</label>
                    <input
                        type="text"
                        name="xbox"
                        value={profileData.xbox}
                        onChange={handleInputChange}
                    />
                    <label>PSN:</label>
                    <input
                        type="text"
                        name="psn"
                        value={profileData.psn}
                        onChange={handleInputChange}
                    />
                    <label>Steam:</label>
                    <input
                        type="text"
                        name="steam"
                        value={profileData.steam}
                        onChange={handleInputChange}
                    />
                    <label>Google Play:</label>
                    <input
                        type="text"
                        name="google_play"
                        value={profileData.google_play}
                        onChange={handleInputChange}
                    />
                    <label>Nintendo:</label>
                    <input
                        type="text"
                        name="nintendo"
                        value={profileData.nintendo}
                        onChange={handleInputChange}
                    />
                    <label>Epic ID:</label>
                    <input
                        type="text"
                        name="epic_id"
                        value={profileData.epic_id}
                        onChange={handleInputChange}
                    />
                    <label>Bio:</label>
                    <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                    ></textarea>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Update Profile</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            )}
            <button onClick={handleDelete}>Delete Profile</button>
            {error && <p>{error}</p>}
        </div>
    );
};
