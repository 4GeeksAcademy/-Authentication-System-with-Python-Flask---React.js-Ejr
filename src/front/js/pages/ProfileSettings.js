import React, { useState } from "react";
import { ProfileInformation } from "../component/ProfileInformation";
import { FriendRequest } from "../component/FriendRequest";
import { SwapRequests } from "../component/SwapRequests";
import { Recommendations } from "../component/Recommendations";

export const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profileInformation");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container">
      <div className="mt-5 mb-5">
        <h1>Welcome Back Name!</h1>
      </div>
      <div className="row">
        <div className="settings col-md-3">
          <h4>Settings</h4>
          <a
            className={`nav-link ${activeTab === "profileInformation" ? "active" : ""}`}
            onClick={() => handleTabClick("profileInformation")}
            href="#"
          >
            Profile Information
          </a>
          <a
            className={`nav-link ${activeTab === "friendRequests" ? "active" : ""}`}
            onClick={() => handleTabClick("friendRequests")}
            href="#"
          >
            Friend Requests
          </a>
          <a
            className={`nav-link ${activeTab === "swapRequests" ? "active" : ""}`}
            onClick={() => handleTabClick("swapRequests")}
            href="#"
          >
            Swap Requests
          </a>
          <a
            className={`nav-link ${activeTab === "recommendations" ? "active" : ""}`}
            onClick={() => handleTabClick("recommendations")}
            href="#"
          >
            Recommendations
          </a>
        </div>
        <div className="col-md-8 vertical-line">
          <div className="p-4">
            {activeTab === "profileInformation" && <ProfileInformation />}
            {activeTab === "friendRequests" && <FriendRequest />}
            {activeTab === "swapRequests" && <SwapRequests />}
            {activeTab === "recommendations" && <Recommendations />}
          </div>
        </div>
      </div>
    </div>
  );
};
