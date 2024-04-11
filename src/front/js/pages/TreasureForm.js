import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./../store/appContext";

const TreasureForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [city_name, setCity_name] = useState('');
    const [tips, setTips] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); 
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
        }
    }, [navigate, actions]);

    useEffect(() => { 
        if (imageUrl) hideTreasure(); 
    }, [imageUrl]); 

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "treasure");

        fetch("https://api.cloudinary.com/v1_1/dxzhssh9m/image/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setImageUrl(data.url); 
        })
        .catch(error => {
            setError("Upload error");
            console.error("Error uploading the image:", error);
        });
    };

    const hideTreasure = async () => {
        setError("");
        try {
            const token = localStorage.getItem("jwt-token");
            const response = await fetch(`${process.env.BACKEND_URL}/api/hide`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, location, city_name, tips, image: imageUrl }) 
            });

            if (!response.ok) throw new Error("This treasure doesn't exist");

            await response.json();
            navigate("/treasures");
        } catch (error) {
            setError("Update error");
            console.error("Error hiding the treasure:", error);
        }
    };

    return (
        <div className="text-center treasure-form-page">
            <form onSubmit= {(e) => {e.preventDefault()
            uploadImage()
            }}>
                <h1 className="title-hide pb-4">Hide treasure</h1>
                <div className="hide-input-group pb-4">
                    <label htmlFor="name-treasure">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="treasure-name"
                        placeholder="Enter name of treasure"
                        value={name}
                        onChange={e=> setName(e.target.value)}
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        className="treasure-location"
                        placeholder="Enter location"
                        value={location}
                        onChange={e=> setLocation(e.target.value)}
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="pistas">City</label>
                    <div className="treasure-city">
                        <input
                            type="text"
                            id="city"
                            className="treasure-city"
                            placeholder="Enter city"
                            value={city_name}
                            onChange={e=> setCity_name(e.target.value)}
                        />
                    </div>
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="pistas">Tips</label>
                    <div className="treasure-pistas">
                        <input
                            type="text"
                            id="tips"
                            className="treasure-tips"
                            placeholder="Enter your tips"
                            value={tips}
                            onChange={e=> setTips(e.target.value)}
                        />
                    </div>
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="image">Image</label>
                    <div className="password-input-container">
                        <input
                            type="file"
                            id="image"
                            className="treasure-image-form"
                            placeholder="Enter your image"
                            onChange={e=> {
                                console.log(e.target.files[0])
                            setImage(e.target.files[0])}}
                        />
                    </div>
                </div>
                <div className="button-hide">
                    <button type="submit" className="btn btn-warning">Hide</button>
                </div>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    )
}

export default TreasureForm
