import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import fortniteImage from '../../img/Fortnite.png';
import xboxIcon from '../../img/xbox.png';
import switchIcon from '../../img/switch.png';
import playstationIcon from '../../img/playstation.png';
import pcIcon from '../../img/pc.png';
import { FaUser } from "react-icons/fa";
import '../../styles/RoomDetail.css';
import RoomDetailsView from '../component/RoomInfoComponent.jsx';
import ParticipantsView from '../component/ParticipantsInfoComponent.jsx';

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
    const [currentView, setCurrentView] = useState('details');
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
    }, [roomId, store.rooms.participants]);

    useEffect(() => {
        if (showRequests) {
            fetchRequests();
        }
    }, [showRequests]);

    const checkRequestStatus = async () => {
        const status = await actions.checkRequestStatus(roomId);
        setRequestStatus(status);
    };

    const fetchRequests = async () => {
        try {
            const fetchedRequests = await actions.fetchRoomRequests(roomId);
            setRequests(fetchedRequests);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const fetchedComments = await actions.getComments(roomId);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            console.error('No JWT token found');
            return;
        }

        if (newComment.trim() === '') return;
        const isHost = room.host_name === username;
        const success = await actions.addComment(roomId, newComment, isHost);
        if (success) {
            setNewComment('');
            fetchComments();
        } else {
            alert('Failed to add comment.');
        }
    };

    const handleKickParticipant = async (participantId) => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            console.error('No JWT token found');
            return;
        }

        const success = await actions.updateParticipantStatus(roomId, participantId, 'kicked');
        if (success) {
            setRoom(prevRoom => ({
                ...prevRoom,
                participants: prevRoom.participants.map(p =>
                    p.participant_id === participantId ? { ...p, confirmed: false, status: 'kicked' } : p
                ).filter(p => p.status !== 'kicked')
            }));
            alert('Participant kicked successfully!');
        } else {
            alert('Failed to kick participant.');
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

    const handleAbandonRoom = async () => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            console.error('No JWT token found');
            return;
        }

        const success = await actions.updateParticipantStatus(roomId, userId, 'abandoned');
        if (success) {
            setRoom(prevRoom => ({
                ...prevRoom,
                participants: prevRoom.participants.filter(p => p.participant_id !== userId)
            }));
            alert('You have successfully abandoned the room');
            navigate('/');
        } else {
            alert('Failed to abandon the room.');
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
        const success = await actions.updateRoomRequest(roomId, requestId, action);
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

    const formatDateTime = (startDate, startTime, endDate = null, endTime = null) => {
        const startDateTime = new Date(`${startDate} ${startTime}`);
        console.log("Start Date:", startDate, "Start Time:", startTime); // Debugging
        console.log("Parsed Start DateTime:", startDateTime); // Debugging
        const formattedStart = startDateTime.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        if (endDate && endTime) {
            const endDateTime = new Date(`${endDate} ${endTime}`);
            console.log("End Date:", endDate, "End Time:", endTime); // Debugging
            console.log("Parsed End DateTime:", endDateTime); // Debugging
            const formattedEnd = endDateTime.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            return `Starts: ${formattedStart} | Finishes: ${formattedEnd}`;
        } else {
            return `Starts: ${formattedStart}`;
        }
    };

    const renderPlatformIcon = (platform) => {
        const iconStyle = { width: '26px', height: '26px', position: 'relative', top: '-5px' };
        switch (platform.toLowerCase()) {
            case 'xbox':
                return <img src={xboxIcon} alt="Xbox" style={iconStyle} />;
            case 'switch':
                return <img src={switchIcon} alt="Switch" style={iconStyle} />;
            case 'playstation':
                return <img src={playstationIcon} alt="PlayStation" style={iconStyle} />;
            case 'pc':
                return <img src={pcIcon} alt="PC" style={iconStyle} />;
            default:
                return null;
        }
    };

    const isHost = room.host_name === username;
    const isParticipantOrHost = isHost || room.participants.some(p => p.participant_id === userId && p.confirmed);

    const participantsCount = room.participants ? room.participants.length : 0;

    const startDate = room.date;
    const startTime = room.time;
    const endDate = room.end_date || null;
    const endTime = room.end_time || null;

    const formattedDateTime = formatDateTime(startDate, startTime, endDate, endTime);

    const handleToggleView = (view) => {
        setCurrentView(view);
    };

    return (
        <div>
            <div className="back"><button className="go-back" onClick={() => navigate('/')}>Go back</button></div>

            <div className={`room-detail ${!isParticipantOrHost ? 'room-detail-small' : ''}`}>
                <div className="room-header">
                    <img src={fortniteImage} alt="Room Image" className="room-image" />
                    <div className="room-info">
                        <div className='d-flex justify-content-between text-info'>
                            <p>{room.game_name}</p>
                            <p className="text-info fs-6 fw-semibold font-family-Inter m-0">
                                <FaUser /> {participantsCount}/{room.room_size}
                            </p>
                        </div>
                        <div className="room-pills">
                            <button className={`pill-detail ${currentView === 'details' ? 'active' : ''}`} onClick={() => handleToggleView('details')}>Details</button>
                            <button className={`pill-participants ${currentView === 'participants' ? 'active' : ''}`} onClick={() => handleToggleView('participants')}>Participants</button>
                        </div>

                        {currentView === 'details' && (
                            <RoomDetailsView
                                room={room}
                                className="p-0"
                                participantsCount={participantsCount}
                                formattedDateTime={formattedDateTime}
                                renderPlatformIcon={renderPlatformIcon}
                                handleKickParticipant={handleKickParticipant}
                                isHost={isHost}
                            />
                        )}
                        {currentView === 'participants' && (
                            <ParticipantsView
                                requests={requests}
                                handleRequestAction={handleRequestAction}
                            />
                        )}
                    </div>
                </div>


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

                {isHost && (
                    <div>
                        <button onClick={handleToggleRequests}>{showRequests ? 'Hide Requests' : 'Show Requests'}</button>
                        {showRequests && requests.map(request => (
                            <div key={request.room_request_id}>
                                <p>{request.username} wants to join</p>
                                <button onClick={() => handleRequestAction(request.room_request_id, 'accepted')}>Accept</button>
                                <button onClick={() => handleRequestAction(request.room_request_id, 'rejected')}>Reject</button>
                            </div>
                        ))}
                    </div>
                )}

                {!isParticipantOrHost && (
                    <div>
                        {requestStatus === null && <button onClick={handleJoinRoom}>Join Room</button>}
                        {requestStatus === 'pending' && <button onClick={handleWithdrawRequest}>Withdraw Request</button>}
                    </div>
                )}

                {isParticipantOrHost && !isHost && (
                    <div>
                        <button onClick={handleAbandonRoom}>Abandon Room</button>
                    </div>
                )}
            </div>
        </div>
    );
};
