import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext";
import Swal from 'sweetalert2'

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

    const markFound = async () => {
        const token = localStorage.getItem("jwt-token");
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/treasure/${id}/found`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "Marked as founded!",
                    text: 'Earned 10 points!',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate("/treasures");
            } else if (response.status === 403) {
                const data = await response.json()
                Swal.fire({
                    icon: "error",
                    title: "Action Forbidden!",
                    text: data.msg
                });
            }

            else {
                Swal.fire({
                    icon: "error",
                    title: "Mark Failed",
                    text: 'Couldnt marked treasure as founded',
                    footer: 'This treasure has been founded'
                });
            }

        } catch (error) {
            console.error("Error al marcar el tesoro:", error);
        }
    };

    if (!treasure) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }


    return (
        <div className="single-treasure-page">
            <img src={treasure.image} alt={treasure.name} className="image-single" />
            <div className="text-container">
                <p className="name-single">{treasure.name}</p>
                <p className="text-single"><span class="bold">Location:</span> <a className="color-url" href={treasure.location} target="_blank">Open in Google Maps</a></p>
                <p className="text-single"><span class="bold">City:</span> {treasure.city_name}</p>
                <p className="text-single"><span class="bold">Tips:</span> {treasure.tips}</p>
                <button className="button-single" onClick={markFound}>Click if you found it</button>
            </div>
        </div>
    );
};

export default SingleTreasure
