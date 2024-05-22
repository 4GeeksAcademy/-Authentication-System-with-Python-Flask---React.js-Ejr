import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/RoomDetail.css';

export const RoomDetail = () => {
    const { store, actions } = useContext(Context);
    const { roomId } = useParams();
    const navigate = useNavigate();
    const room = store.rooms.find(room => room.room_id === parseInt(roomId));

  /*   useEffect(() => {
        if (!room) {
            navigate('/'); // Redirect to home if room not found
        }
    }, [room, navigate]); */

    if (!room) {
        return <div>Loading...</div>;
    }

    const handleJoinRoom = () => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            navigate('/login');
        } else {
            actions.joinRoom(room.id);
        }
    };

    return (
        <div className="room-detail">
            <button className="go-back" onClick={() => navigate('/')}>Go back</button>
            <div className="room-header">
                <img src="path_to_image" alt="Room Image" className="room-image" />
                <div className="room-info">
                    <h1>{room.room_name}</h1>
                    <p><strong>Game:</strong> {room.game_name}</p>
                    <p><strong>Description:</strong> {room.description}</p>
                    <p>{console.log(room.description)}</p>
                    <p><strong>Host:</strong> {room.host_name}</p>
                    <p><strong>Date:</strong> {room.date}</p>
                    <p><strong>Time:</strong> {room.time}</p>
                    <p><strong>Platform:</strong> {room.platform}</p>
                    <p><strong>Mood:</strong> {room.mood}</p>
                    <p><strong>Participants:</strong></p>
                    <ul>
                        {room.participants.map(participant => (
                            <li key={participant.participant_id}>
                                {participant.participant_name} {participant.confirmed ? '(Confirmed)' : '(Pending)'}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="room-actions">
                <button className="join-room" onClick={handleJoinRoom}>Join this room</button>
            </div>
        </div>
    );
};
