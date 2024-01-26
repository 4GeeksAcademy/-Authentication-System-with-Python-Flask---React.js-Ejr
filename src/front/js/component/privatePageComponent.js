import React, { useState } from 'react';
import "../../styles/privatePage.css";

const PrivatePage = ({ user }) => {
    const [activeTab, setActiveTab] = useState('basic-info');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="container">
            <div className="card card-nav">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'basic-info' ? 'active' : ''}`}
                                onClick={(e) =>{ 
                                    e.preventDefault();
                                    handleTabChange('basic-info');
                                }}
                                href="#basic-info"
                            >
                                Basic Info
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'change-password' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabChange('change-password');
                                }}
                                href="#change-password"
                            >
                                Change Password
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'bookmarks' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabChange('bookmarks');
                            }}
                                href="#bookmarks"
                            >
                                Bookmarks
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'achievements' ? 'active' : ''}`}
                                onClick={(e) =>{ 
                                    e.preventDefault();
                                    handleTabChange('achievements');
                            }}
                                href="#achievements"
                            >
                                Achievements
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'itinerary' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabChange('itinerary');
                            }}
                                href="#itinerary"
                            >
                                Create Itinerary
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="card-body tab-content">
                    <div className={`tab-pane fade show ${activeTab === 'basic-info' ? 'active' : ''}`} id="basic-info">
                        <p>Basic Info Content Goes Here</p>
                    </div>
                    <div className={`tab-pane fade show ${activeTab === 'change-password' ? 'active' : ''}`} id="change-password">
                        <p>Change Password Content Goes Here</p>
                    </div>
                    <div className={`tab-pane fade show ${activeTab === 'bookmarks' ? 'active' : ''}`} id="bookmarks">
                        <p>Bookmarks Content Goes Here</p>
                    </div>
                    <div className={`tab-pane fade show ${activeTab === 'achievements' ? 'active' : ''}`} id="achievements">
                        <p>Achievements Content Goes Here</p>
                    </div>
                    <div className={`tab-pane fade show ${activeTab === 'itinerary' ? 'active' : ''}`} id="itinerary">
                        <p>Create Itinerary Content Goes Here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivatePage;
/*<div>
<h1>Welcome, {user.first_name} {user.last_name}!</h1>
<p>Saved Trips: {user.saved_trips}</p>
<p>XP Points: {user.xp_points}</p>
<a href="/createItinerary">Start Creating New Itineraries</a>
</div>*/