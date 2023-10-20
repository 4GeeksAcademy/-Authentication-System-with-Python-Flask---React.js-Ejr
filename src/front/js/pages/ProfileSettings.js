import React, { useState, useEffect, useContext } from "react";
import { ProfileInformation } from "../component/ProfileInformation";
import { FriendRequest } from "../component/FriendRequest";
import { SwapRequests } from "../component/SwapRequests";
import { Recommendations } from "../component/Recommendations";
import { Context } from "../store/appContext";

export const ProfileSettings = () => {
  const { store, actions } = useContext(Context);
  const [activeTab, setActiveTab] = useState("profileInformation");
  const [friendRequests, setFriendRequests] = useState([])
  const [userInformation, setUserInformation] = useState({
    user_id: null,
    email: "",
    name: "",
    lastname: "",
    profileimg: "",
});

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    actions.verifyIfUserLoggedIn();
    actions.getUserInformation().then((data) => {
        console.log("data", data)
        setUserInformation(data);
    });
    actions.allFriendshipRequests().then((data) => {
      console.log("friendships", data)
      setFriendRequests(data)
  })
}, []);


  return userInformation.user_id ? (
    <div className="container">
      <div className="mt-5 mb-5">
        <h1>Welcome Back {userInformation.name}!</h1>
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
            {activeTab === "profileInformation" && <ProfileInformation {...userInformation}/>}
            {activeTab === "friendRequests" && <FriendRequest  lista={friendRequests}/>} 
            {activeTab === "swapRequests" && <SwapRequests />}
            {activeTab === "recommendations" && <Recommendations />}
          </div>
        </div>
      </div>
    </div>
  ) : <div>Loading</div>;
};
