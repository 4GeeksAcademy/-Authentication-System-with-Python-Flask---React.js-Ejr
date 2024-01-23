import React from 'react';

const PrivatePage = ({ user }) => {
    return (
        <div>
            <h1>Welcome, {user.first_name} {user.last_name}!</h1>
            <p>Saved Trips: {user.saved_trips}</p>
            <p>XP Points: {user.xp_points}</p>
            <a href="/createItinerary">Start Creating New Itineraries</a>
        </div>
    );
}

export default PrivatePage;
