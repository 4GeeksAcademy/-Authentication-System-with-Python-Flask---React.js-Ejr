import React, { useEffect, useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export const MyRooms = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [userRooms, setUserRooms] = useState([]);
    const username = localStorage.getItem('username');
    useEffect(() => {
        const fetchData = async () => {
            if (store.rooms.length === 0) {
                await actions.fetchRooms(); 
            }
            const rooms = store.rooms.filter(room => room.host_name === username);
            setUserRooms(rooms);
        };
        fetchData();
    }, [store.rooms, username]);


    const handleViewRequests = (roomId) => {
        navigate(`/my-room/${roomId}`);
    };

    return (
        <div className="container mt-5">
            <h2>My Rooms</h2>
            {userRooms.length > 0 ? (
                <ul className="list-group">
                    {userRooms.map(room => (
                        <li key={room.room_id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{room.room_name} - {room.game_name}</span>
                            <button className="btn btn-primary" onClick={() => handleViewRequests(room.room_id)}>View Requests</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No rooms found where you are the host.</p>
            )}
        </div>
    );
};
