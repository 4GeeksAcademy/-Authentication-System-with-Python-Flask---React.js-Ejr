import React, { useState } from "react";

    export const Gestor_perfil = () => {
            
        // Simulando que la información del usuario viene de algún proceso de login
        const user = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            username: 'johndoe'
        };
        const [image, setImage] = useState(null);
        const [response, setResponse] = useState(null);
        const handleFileChange = (e) => setImage(e.target.files[0]);
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!image) return;
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('username', user.username);
            const response = await fetch('http://localhost:3001/api/upload', {
            method: 'POST',
            body: formData,
            });
            const data = await response.json();
            setResponse(data);
        };
        return (
            <div>
            <h2>Upload your profile picture</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
            {response && (
                <div>
                <h3>Upload Successful:</h3>
                {response.filePath && <img src={`http://localhost:3001${response.filePath}`} alt="Uploaded" />}
                </div>
            )}
            </div>
        );
	}