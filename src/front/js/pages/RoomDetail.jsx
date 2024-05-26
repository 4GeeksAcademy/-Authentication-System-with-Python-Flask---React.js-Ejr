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
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState(null);
    const username = localStorage.getItem('username');
    const userId = parseInt(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchData = async () => {
            await actions.fetchRooms();
            const fetchedRoom = store.rooms.find(room => room.room_id === parseInt(roomId));
            setRoom(fetchedRoom);
            await checkRequestStatus();
            await fetchComments();
            setLoading(false);
        };

        fetchData();
    }, [roomId]);

    useEffect(() => {
        if (showRequests) {
            fetchRequests();
        }
    }, [showRequests]);

    const checkRequestStatus = async () => {
        console.log('Checking request status');
        const status = await actions.checkRequestStatus(roomId);
        console.log('Request status:', status);
        setRequestStatus(status);
    };

    const fetchRequests = async () => {
        try {
            console.log('Fetching requests');
            const fetchedRequests = await actions.fetchRoomRequests(roomId);
            setRequests(fetchedRequests);
            console.log('Fetched requests:', fetchedRequests);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const fetchComments = async () => {
        try {
            console.log('Fetching comments');
            const fetchedComments = await actions.getComments(roomId);
            setComments(fetchedComments);
            console.log('Fetched comments:', fetchedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        console.log('Adding comment:', newComment);
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            console.error('No JWT token found');
            return;
        }
    
        if (newComment.trim() === '') return;
        const isHost = room.host_name === username;
        console.log('isHost:', isHost);  // Asegúrate de que esto imprima true/false correctamente
        const success = await actions.addComment(roomId, newComment, isHost);
        console.log('Comment add success:', success);
        if (success) {
            setNewComment('');
            fetchComments();
        } else {
            alert('Failed to add comment.');
        }
    };

    const handleJoinRoom = async () => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            navigate('/login');
        } else {
            const success = await actions.joinRoom(roomId);
            if (success) {
                alert('Join request sent successfully!');
                setRequestStatus('pending');
            } else {
                alert('Failed to send join request.');
            }
        }
    };

    const handleWithdrawRequest = async () => {
        const success = await actions.withdrawRequest(roomId);
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
        console.log(`Updating request ${requestId} to ${action}`);
        const success = await actions.updateRoomRequest(roomId, requestId, action);
        console.log(`Request update status: ${success}`);
        if (success) {
            setRequests(prevRequests => prevRequests.filter(req => req.room_request_id !== requestId));
            if (action === 'accepted') {
                const participant = requests.find(req => req.room_request_id === requestId);
                setRoom(prevRoom => ({
                    ...prevRoom,
                    participants: [...prevRoom.participants, participant]
                }));
            }
        } else {
            alert('Failed to update request.');
        }
    };

    if (loading || !room) {
        return <div>Loading...</div>;
    }

    const isHost = room.host_name === username;
    const isParticipantOrHost = isHost || room.participants.some(p => p.participant_id === userId && p.confirmed);

    console.log('room:', room);
    console.log('requestStatus:', requestStatus);
    console.log('isParticipantOrHost:', isParticipantOrHost);
    console.log('host:', isHost)

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
                {!isParticipantOrHost && requestStatus === 'None' && !isHost && (
                    <button className="join-room" onClick={handleJoinRoom}>Join this room</button>
                )}
                {!isParticipantOrHost && requestStatus === 'pending' && !isHost && (
                    <button className="withdraw-request" onClick={handleWithdrawRequest}>Withdraw Request</button>
                )}
                {isHost && (
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
            {isParticipantOrHost && (
                <div className="comments-section">
                    <h3>Comments</h3>
                    <div className="comments-list">
                        {comments.map(comment => (
                            <div key={comment.comment_id} className="comment">
                                <p><strong>{comment.username}</strong>: {comment.content}</p>
                                <p><small>{comment.created_at}</small></p>
                            </div>
                        ))}
                    </div>
                    <div className="add-comment">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment"
                        />
                        <button onClick={handleAddComment}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};