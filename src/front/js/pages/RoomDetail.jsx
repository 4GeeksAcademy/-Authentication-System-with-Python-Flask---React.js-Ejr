import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/RoomDetail.css';

export const RoomDetail = () => {
    const { store, actions } = useContext(Context);
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [showRequests, setShowRequests] = useState(false);
    const [requests, setRequests] = useState([]);
    const [participants, setParticipants] = useState([]);
    const room = store.rooms.find(room => room.room_id === parseInt(roomId));
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (!room) {
            navigate('/'); // Redirect to home if room not found
        } else {
            setParticipants(room.participants);
        }
    }, [room, navigate]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (showRequests && room) {
                const fetchedRequests = await actions.fetchRoomRequests(room.room_id);
                setRequests(fetchedRequests);
            }
        };
        fetchRequests();
    }, [showRequests, room]);

    const handleJoinRoom = async () => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            navigate('/login');
        } else {
            const success = await actions.joinRoom(room.room_id);
            if (success) {
                alert('Join request sent successfully!');

            } else {
                alert('Failed to send join request.');
            }
        }
    };

    const handleToggleRequests = () => {
        setShowRequests(prevShowRequests => !prevShowRequests);
    };

    const handleRequestAction = async (requestId, action) => {
        const success = await actions.updateRoomRequest(room.room_id, requestId, action);
        if (success) {
            setRequests(prevRequests => 
                prevRequests.filter(req => req.room_request_id !== requestId)
            );
            if (action === 'accepted') {
                const acceptedRequest = requests.find(req => req.room_request_id === requestId);
                const newParticipant = {
                    participant_id: acceptedRequest.user_id,
                    participant_name: acceptedRequest.participant_name,
                    confirmed: true
                };
                setParticipants(prevParticipants => [...prevParticipants, newParticipant]);
            }
        } else {
            alert('Failed to update request.');
        }
    };

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div className="room-detail">
            <button className="go-back" onClick={() => navigate('/')}>Go back</button>
            <div className="room-header">
                <img src="path_to_image" alt="Room Image" className="room-image" />
                <div className="room-info">
                    <h1>{room.room_name}</h1>
                    <p><strong>Game:</strong> {room.game_name}</p>
                    <p><strong>Description:</strong> {room.description}</p>
                    <p><strong>Host:</strong> {room.host_name}</p>
                    <p><strong>Date:</strong> {room.date}</p>
                    <p><strong>Time:</strong> {room.time}</p>
                    <p><strong>Platform:</strong> {room.platform}</p>
                    <p><strong>Mood:</strong> {room.mood}</p>
                    <p><strong>Participants:</strong></p>
                    <ul>
                        {participants.map(participant => (
                            <li key={participant.participant_id}>
                                {participant.participant_name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="room-actions">
                {room.host_name !== username && (
                    <button className="join-room" onClick={handleJoinRoom}>Join this room</button>
                )}
                {room.host_name === username && (
                    <button className="btn btn-secondary" onClick={handleToggleRequests}>
                        {showRequests ? 'Hide Requests' : 'Show Requests'}
                    </button>
                )}
            </div>
            {showRequests && (
                <div className="room-requests">
                    <h3>Join Requests</h3>
                    <ul>
                        {requests.map(request => (
                            <li key={request.room_request_id}>
                                {request.participant_name} - {request.status}
                                <button className="btn btn-success" onClick={() => handleRequestAction(request.room_request_id, 'accepted')}>Accept</button>
                                <button className="btn btn-danger" onClick={() => handleRequestAction(request.room_request_id, 'rejected')}>Reject</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
