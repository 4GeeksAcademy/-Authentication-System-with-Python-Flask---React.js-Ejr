import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext";

export const Room = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchRooms();
    }, []);

    return (
        <div>
            {store.rooms.map((room) => (
                <div key={room.id} className="card mb-3 room" style={{ maxWidth: "540px" }}>
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
            ))}
        </div>
    );
};
