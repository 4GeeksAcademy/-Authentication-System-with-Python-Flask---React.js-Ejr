import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext";

const SingleTreasure = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [treasure, setTreasure] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
            loadTreasure();
        }
    }, [navigate, id]);

    const loadTreasure = async () => {
        try {
            const url = `${process.env.BACKEND_URL}/api/treasure/${id}`;
            console.log("URL de la petición:", url);
            const token = localStorage.getItem("jwt-token");
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("Response received:", response);
            if (response.ok) {
                const data = await response.json();
                setTreasure(data);
            } else {
                throw new Error('Failed to fetch treasure');
            }
        } catch (error) {
            console.error("Error fetching treasure:", error);
        }
    };

    if (!treasure) {
        return <div>No hay tesoro...</div>;
    }

    return (
        <div className="single-treasure-page">
            <img src={treasure.image} alt={treasure.name} className="image-single" />
            <div className="text-container">
                <p className="name-single">{treasure.name}</p>
                <p className="text-single"><span class="bold">Location:</span> {treasure.location}</p>
                <p className="text-single"><span class="bold">City:</span> {treasure.city_name}</p>
                <p className="text-single"><span class="bold">Tips:</span> {treasure.tips}</p>
                <button className="button-single">Click if you found it</button>
            </div>
        </div>
    );
};

export default SingleTreasure
