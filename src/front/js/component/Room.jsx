import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Room = ({ room }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/room/${room.room_id}`);
    };

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
                                <span>{room.participants.length}/4</span>
                            </div>
                            <h5>{room.room_name}</h5>
                        </div>
                        <p className="card-text">{room.game_description}</p>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                <span>Starts: {room.date} at {room.time}</span>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
