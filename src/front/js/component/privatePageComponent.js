import React, { useState } from 'react';
import "../../styles/privatePage.css";
import BasicInfo from "./PrivatePage/basicInfo.js";
import { Link } from 'react-router-dom';

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
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg> 
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
</svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmarks" viewBox="0 0 16 16">
  <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1z"/>
  <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1"/>
</svg>
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
                        <BasicInfo></BasicInfo>
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