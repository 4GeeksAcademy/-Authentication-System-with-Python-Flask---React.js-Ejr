import React from 'react';

const PrivatePage = ({ user }) => {
    return (
        <div>
            <h1>Welcome, {user.first_name} {user.last_name}!</h1>
            <div>
                <h2>Saved Trips:</h2>
                {user.saved_trips.map((trip, index) => (
                    <div key={index}>
                        <p>Trip {index + 1}:</p>
                        <p>Location: {trip.location}</p>
                    </div>
                ))}
            </div>
            <p>XP Points: {user.xp_points}</p>
            <a href="/createItinerary">Start Creating New Itineraries</a>
        </div>
    );
}

export default PrivatePage;
