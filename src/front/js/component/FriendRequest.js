import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const FriendRequest = () => {
    const { actions } = useContext(Context);
    const [friendRequests, setFriendRequests] = useState([])

    const handleAcceptFriend = (friend) => {
        actions.acceptFriendRequest(friend.friendship_id).then((data) => {
            if (data) {
                actions.allFriendshipRequests().then((data) => {
                    console.log("friendships", data)
                    setFriendRequests(data)
                })
            }
        });
    }

    useEffect(() => {
        actions.allFriendshipRequests().then((data) => {
            console.log("friendships", data)
            setFriendRequests(data)
        })
    }, []);

    return (
        <div className="Friend_requests">
            <a className="nav-link" href="#">
                Friend Requests
            </a>
            {friendRequests.map((friend) => (
                <div className="row align-items-center my-4" key={friend.friendship_id}>
                    <div className="col-md-2">
                        <h5>{friend.user2.name}</h5>
                        <img src={friend.user2.profileimg} alt="Profile Icon" style={{ width: "5rem", height: "5rem" }} className="rounded-circle" />
                    </div>
                    <div className="col-md-10">
                        <div className="row g-3">
                            <div className="col-md-5 text-center">
                                <div className="alert" >
                                    <button type="submit" className="btn btn-primary mb-5 custom-update" style={{ width: "190px", height: "50px" }} onClick={() => handleAcceptFriend(friend)}>
                                        Accept Friend request
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-5 text-center">
                                <div className="alert" >
                                    <button type="submit" className="btn btn-primary mb-5 alert-info-decline" style={{ width: "190px", height: "50px" }}>
                                        Decline Friend request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
