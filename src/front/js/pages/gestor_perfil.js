import React, { useState } from "react";
import { Link } from "react-router-dom";

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
            
            <div className="container mt-5 text-center">
                <h2 className="text-center pt-5">Upload your profile picture</h2>
                <form onSubmit={handleSubmit} className="py-5">
                    <div className="form-group">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="form-control-file"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Upload</button>
                </form>
                
                <p className="border border-success rounded-pill"><strong>Name:</strong> {user.name}</p>
                <p className="border border-success rounded-pill"><strong>Email:</strong> {user.email}</p>
                <p className="border border-success rounded-pill"><strong>Username:</strong> {user.username}</p>
                
                {response && (
                    <div className="alert alert-success">
                        <h3 className="alert-heading">Upload Successful:</h3>
                        {response.filePath && (
                            <img
                                src={`http://localhost:3001${response.filePath}`}
                                alt="Uploaded"
                                className="img-fluid mt-3"
                            />
                        )}
                    </div>
                )}
                <Link to="/">
				<button className="btn btn-dark mt-3">Back home</button>
			</Link>
            </div>
        );
	}