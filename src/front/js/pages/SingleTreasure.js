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
        Swal.fire({
            title: 'Enter the code you found with the treasure',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: async (inputCode) => {
                return fetch(`${process.env.BACKEND_URL}/api/treasure/${id}/found`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ code: inputCode })
                })
                    .then(response => response.json().then(data => {
                        if (!response.ok) {
                            throw new Error(data.msg || 'Unknown error');
                        }
                        return data;
                    }))
                    .catch(error => {
                        if (!error.message.includes('Unknown error') && !error.message.includes('Incorrect code')) {
                            throw error;
                        }
                        Swal.showValidationMessage(
                            `Request failed: ${error.message}`
                        );
                        return false;
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                Swal.fire({
                    title: '¡Treasure Found!',
                    text: '¡You earn 10 points!',
                    icon: 'success'
                }).then(() => {
                    navigate("/treasures");
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            } else if (result.value === false) {
            }
        }).catch(error => {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Close'
            });
        });
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
