import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./../store/appContext";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Swal from "sweetalert2";

const TreasureForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState({ lat: 40.416775, lng: -3.703790 });
    const [city_name, setCity_name] = useState('');
    const [tips, setTips] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [cities, setCities] = useState([]);
    const [code, setCode] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
            fetchCities();
        }
    }, [navigate, actions]);

    const fetchCities = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + '/api/cities');
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const onMapClick = (e) => {
        setLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
    };

    const uploadImage = () => {
        if (!image) {
            setError("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "treasure");

        fetch(`https://api.cloudinary.com/v1_1/${process.env.USER_CLOUDINARY}/image/upload`, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setImageUrl(data.url);
                hideTreasure(data.url);
            })
            .catch(error => {
                setError("Upload error");
                console.error("Error uploading the image:", error);
            });
    };

    const hideTreasure = async (uploadedImageUrl) => {
        setError("");
        const unique_code = Math.random().toString(10).slice(2, 7)
        setCode(unique_code)
        try {
            const token = localStorage.getItem("jwt-token");
            const locationUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
            const response = await fetch(`${process.env.BACKEND_URL}/api/hide`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, location: locationUrl, city_name, tips, image: uploadedImageUrl, code: unique_code })
            });

            if (!response.ok) throw new Error("Fail to hide treasure");

            await response.json();
            Swal.fire({
                title: `SECRET CODE: ${unique_code}`,
                text: 'Dont forget hide this code with your treasure!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/treasures");
                }
            });
            navigate("/treasures");
        } catch (error) {
            setError("Update error");
            console.error("Error hiding the treasure:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadImage();
    };

    return (
        <div className="text-center treasure-form-page">
            <h1 className="title-hide pt-5 pb-4">Hide treasure</h1>
            <form onSubmit={handleSubmit} className="form-hide">
                <div className="hide-input-group pb-4">
                    <label htmlFor="name-treasure">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="treasure-name"
                        placeholder="Enter name of treasure"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="tips">Tips</label>
                    <input
                        type="text"
                        id="tips"
                        className="treasure-tips"
                        placeholder="Enter your tips"
                        value={tips}
                        onChange={e => setTips(e.target.value)}
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="location">Location (Select where you hidden the treasure)</label>
                    <LoadScript googleMapsApiKey={process.env.API_KEY_GOOGLE}>
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '350px', borderRadius: '10px', border: '2px solid #FFC107' }}
                            center={location}
                            zoom={10}
                            onClick={onMapClick}
                        >
                            <Marker position={location} />
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="city">City</label>
                    <select
                        id="city"
                        className="treasure-city"
                        style={{ width: "190px" }}
                        value={city_name}
                        onChange={e => setCity_name(e.target.value)}
                    >
                        {cities.map((city) => (
                            <option key={city.name} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        className="treasure-image-form"
                        onChange={e => setImage(e.target.files[0])}
                    />
                </div>
                <div className="button-hide">
                    <button type="submit" className="btn btn-hide">Hide</button>
                </div>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default TreasureForm;
