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
    const [requestStatus, setRequestStatus] = useState(null);
    const room = store.rooms.find(room => room.room_id === parseInt(roomId));
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (!room) {
            navigate('/'); // Redirect to home if room not found
        }
    }, [room, navigate]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (showRequests && room) {
                const fetchedRequests = await actions.getRoomRequests(room.room_id);
                setRequests(fetchedRequests);
            }
        };
        fetchRequests();
    }, [showRequests, room]);

    useEffect(() => {
        const fetchRequestStatus = async () => {
            if (room) {
                const status = await actions.checkRequestStatus(room.room_id);
                setRequestStatus(status);
            }
        };
        fetchRequestStatus();
    }, [showRequests, room]);

    if (!room) {
        return <div>Loading...</div>;
    }

    const handleJoinRoom = async () => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            navigate('/login');
        } else {
            const success = await actions.joinRoom(room.room_id);
            if (success) {
                alert('Join request sent successfully!');
                setRequestStatus('pending');
            } else {
                alert('Failed to send join request.');
            }
        }
    };

    const handleWithdrawRequest = async () => {
        const success = await actions.withdrawRequest(room.room_id);
        if (success) {
            alert('Request withdrawn successfully!');
            setRequestStatus(null);
        } else {
            alert('Failed to withdraw request.');
        }
    };

    const handleToggleRequests = () => {
        setShowRequests(prevShowRequests => !prevShowRequests);
    };

    const handleRequestAction = async (requestId, action) => {
        const success = await actions.updateRoomRequest(room.room_id, requestId, action);
        if (success) {
            setRequests(prevRequests =>
                prevRequests.map(req => req.id === requestId ? { ...req, status: action } : req)
            );
            if (action === 'accepted') {
                const participant = requests.find(req => req.id === requestId);
                setRoom(prevRoom => ({
                    ...prevRoom,
                    participants: [...prevRoom.participants, participant]
                }));
            }
        } else {
            alert('Failed to update request.');
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
                {room.host_name !== username && !requestStatus && (
                    <button className="join-room" onClick={handleJoinRoom}>Join this room</button>
                )}
                {room.host_name !== username && requestStatus === 'pending' && (
                    <button className="withdraw-request" onClick={handleWithdrawRequest}>Withdraw Request</button>
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
                            <li key={request.id}>
                                {request.participant_name} - {request.status}
                                <button className="btn btn-success" onClick={() => handleRequestAction(request.id, 'accepted')}>Accept</button>
                                <button className="btn btn-danger" onClick={() => handleRequestAction(request.id, 'rejected')}>Reject</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};