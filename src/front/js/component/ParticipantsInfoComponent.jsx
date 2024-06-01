import React from 'react';

const ParticipantsView = ({ requests, participants = [], handleRequestAction }) => {
    // Filtrar los participantes confirmados
    const acceptedParticipants = participants.filter(participant => participant.confirmed);

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
            
            <h3>Accepted Participants</h3>
            <ul>
                {acceptedParticipants.map(participant => (
                    <li key={participant.participant_id}>
                        {participant.participant_name} - {participant.platform}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParticipantsView;
