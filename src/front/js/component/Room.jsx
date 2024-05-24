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

    return (
        <div className="card mb-3 room" style={{ maxWidth: "540px" }} onClick={handleCardClick}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={room.imageUrl || "default_image_path.jpg"} className="img-fluid rounded-start" alt={room.room_name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="card-title">
                            <div className="d-flex justify-content-between">
                                <span>{room.game_name}</span>
                                <span>{room.participants.length} / {room.room_size} </span>
                            </div>
                            <h5>{room.room_name}</h5>
                        </div>
                        <p className="card-text">{room.description}</p>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                <span>Starts: {room.date} at {room.time}</span>
                            </small>
                        </p>
                        
                        {isHost && (
                            <div className="d-flex justify-content-between mt-3">
                                <button className="btn btn-warning" onClick={(e) => { e.stopPropagation(); handleEdit(); }}>Edit</button>
                                <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
