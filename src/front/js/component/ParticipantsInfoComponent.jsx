import React from 'react';

const ParticipantsView = ({ requests, handleRequestAction }) => {
    return (
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
    );
};

export default ParticipantsView;