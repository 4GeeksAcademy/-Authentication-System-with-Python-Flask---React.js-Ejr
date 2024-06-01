import React from 'react';
import '../../styles/RoomInfo.css';

const RoomDetailsView = ({ room, participantsCount, formattedDateTime, renderPlatformIcon, isHost  }) => {
    
    return (
        <div className="">
            <div className="formatted-datetime text-info">
                <p>{formattedDateTime}</p>
            </div>
            <p>{room.description}</p>
            <p><strong>Participants:</strong></p>
            <ul>
                {room.participants.map(participant => (
                    <li key={participant.participant_id} className="paticipant-item"> 
                    <img 
                            src={participant.profile_image_url} 
                            alt={`${participant.participant_name}'s profile`} 
                            className="profile-image"
                        />
                        {participant.participant_name}    
                    </li>
                ))}
            </ul>
            <p><strong>Host:</strong> {room.host_name}</p>
            <p className="text-info">Platforms: {renderPlatformIcon(room.platform)}</p>
        </div>
    );
};

export default RoomDetailsView;
