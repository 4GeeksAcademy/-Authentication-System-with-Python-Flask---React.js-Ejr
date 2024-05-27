import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import '../../styles/Room.css';

export const Room = ({ room }) => {
    const token = localStorage.getItem('jwt-token');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleCardClick = () => {
        navigate(`/room/${room.room_id}`);
    };

    const handleEdit = () => {
        navigate(`/edit-room/${room.room_id}`);
    };

    const handleDelete = async () => {
        const success = await actions.deleteRoom(room.room_id);
        if (success) {
            actions.fetchRooms(); // Refresh the rooms list after deletion
        }
    };

    const isHost = username === room.host_name;
    const participantsCount = room.participants ? room.participants.length : 0;

    return (
        <div className="p-1 row justify-content-center room-card" onClick={handleCardClick}>
            <div className="col-14 row justify-content-center d-flex">
                <div className="col-12 row justify-content-between align-items-center">
                    <p className="text-info fs-6 fw-semibold font-family-Inter col-1 m-0 px-3 py-2">{room.game_name}</p>
                    <div className="col-1 row justify-content-end align-items-center d-flex">
                        <p className="text-info fs-6 fw-semibold font-family-Inter col-6 m-0 px-3 py-2">{participantsCount}/{room.room_size}</p>
                        <div className="p-1 col-5 justify-content-center align-items-center d-flex"></div>
                    </div>
                </div>
                <p className="text-white fs-5 fw-semibold font-family-Inter col-5 m-0 px-3 py-2">{room.room_name}</p>
            </div>
            <div className="col-14 row d-flex">
                <p className="col-11 m-0 px-3 py-2">
                    <span className="text-success-subtle fs-6 fw-normal font-family-Inter">I’m looking for fellow gamers to join me in creating a party of 4 for a casual gaming session tonight. If you're interested in some relaxed... </span>
                    <span className="text-white text-opacity-75 fs-6 fw-normal font-family-Inter text-decoration-underline">Continue Reading</span>
                </p>
                <div className="col-12 row justify-content-between align-items-center">
                    <p className="text-info fs-6 fw-medium font-family-Inter col-7 m-0 px-3 py-2">Starts: {room.date} at {room.time}</p>
                    <div className="col-3 row align-items-end d-flex">
                        <div className="p-1 col-2 justify-content-center align-items-center d-flex"></div>
                        <div className="px-px py-1 col-2 justify-content-center align-items-center d-flex"></div>
                        <div className="p-0.5 col-2 justify-content-center align-items-center d-flex"></div>
                        <div className="p-0.5 col-3"></div>
                    </div>
                </div>
            </div>
            {isHost && (
                <div className="col-12 row justify-content-between mt-3">
                    <button className="btn btn-warning" onClick={(e) => { e.stopPropagation(); handleEdit(); }}>Edit</button>
                    <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>Delete</button>
                </div>
            )}
        </div>
    );
};
