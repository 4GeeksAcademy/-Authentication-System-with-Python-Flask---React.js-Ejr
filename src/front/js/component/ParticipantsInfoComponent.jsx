import React from 'react';
import xboxIcon from '../../img/xbox.png';
import switchIcon from '../../img/switch.png';
import playstationIcon from '../../img/playstation.png';
import pcIcon from '../../img/pc.png';


const renderPlatformIcon = (platform) => {
    const iconStyle = { width: '26px', height: '26px', position: 'relative', top: '-5px' };
    switch (platform) {
        case 'xbox':
            return <img src={xboxIcon} alt="Xbox" style={iconStyle} />;
        case 'switch':
            return <img src={switchIcon} alt="Switch" style={iconStyle} />;
        case 'psn':
            return <img src={playstationIcon} alt="PlayStation" style={iconStyle} />;
        case 'steam':
            return <img src={pcIcon} alt="PC" style={iconStyle} />;
        case 'discord':
            return <img src={pcIcon} alt="Discord" style={iconStyle} />; // Cambia el ícono según corresponda
        case 'nintendo':
            return <img src={switchIcon} alt="Nintendo" style={iconStyle} />;
        case 'epic_id':
            return <img src={pcIcon} alt="Epic" style={iconStyle} />; // Cambia el ícono según corresponda
        default:
            return null;
    }
};

const ParticipantsView = ({ requests, participants, handleRequestAction }) => {
    return (
        <div className="participants-view">
            <h3>Participants</h3>
            <div className="participants-list">
                {participants.map(participant => (
                    <div key={participant.participant_id} className="participant">
                        <p>
                            {renderPlatformIcon(participant.platform)}
                            <strong>{participant.participant_name}</strong> - {participant.platform_id}
                        </p>
                    </div>
                ))}
            </div>
            <h3>Requests</h3>
            <div className="requests-list">
                {requests.map(request => (
                    <div key={request.room_request_id} className="request">
                        <p>
                            <strong>{request.participant_name}</strong>
                            <br />
                            Status: {request.status}
                        </p>
                        <button onClick={() => handleRequestAction(request.room_request_id, 'accepted')}>Accept</button>
                        <button onClick={() => handleRequestAction(request.room_request_id, 'rejected')}>Reject</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParticipantsView;
