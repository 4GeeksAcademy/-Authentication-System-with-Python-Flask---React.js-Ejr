import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { TargetCard } from "../component/targetCard";
import { BookCarousel } from "../component/BookCarousel";
import { ProfileOne } from "../component/ProfileOne";
import { ProfileTwo } from "../component/ProfileTwo";
import { Link, useParams } from "react-router-dom";
import { ModalBio } from "../component/modalBio";


export const PublicProfile = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [bio, setBio] = useState("Hello, fellow book lovers! I'm absolutely passionate about the written word. My life revolves around the magic of literature, and you'll often find me lost in the pages of a good book, sipping on a cup of tea.");
    const [friendStatus, setFriendStatus] = useState("unknown")
    const [userInformation, setUserInformation] = useState({
        user_id: null,
        email: "",
        name: "",
        lastname: "",
        profileimg: "",
    });
    const isOwnProfile = params.id === userInformation.user_id || params.id === undefined 

    const updateBio = (newBio) => {
        setBio(newBio);
    };

    useEffect(() => {
        console.log("params", params)
        const { id } = params
        if (id) {
            actions.verifyIfUserLoggedIn();
            actions.getUserById(id).then((data) => {
                console.log("data", data)
                setUserInformation(data);

            });
        } else {
            actions.verifyIfUserLoggedIn();
            actions.getUserInformation().then((data) => {
                console.log("data", data)
                setUserInformation(data);

            });
        }
    }, []);

    const handleFriendRequest = () => {
        actions.friendshipRequest(params.id).then((data) =>{
            if (data) {
                setFriendStatus(data.friendship_status)
            }
        })
    }

    return userInformation.user_id ? (
        <div className="container">
            <div className="image">
                <div className="jumbotron-profile jumbotron-fluid">
                    <div className="container">
                        <img src="https://i.pinimg.com/564x/80/4f/5a/804f5aef48a44508d52b9d3b329ba146.jpg" className="card-img-top" style={{ height: "350px" }} alt="..." />
                    </div>
                    <div className="position-relative">
                        <div className="custom-position">
                            <img src={userInformation.profileimg} alt="Profile Icon" style={{ width: "10rem", height: "10rem" }} className="rounded-circle" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="my-5">
                        <ProfileOne />
                    </div>
                    <div className="my-5">
                        <ProfileTwo />
                    </div>
                    <div className="my-5">
                        <TargetCard />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-4">
                        <div className="Profile_information">
                            <div className="nav flex-column">
                                <div className="row align-items-center">
                                    <div className="col-md-5">
                                        <h4 className="name_surname">{userInformation.name} {userInformation.lastname}</h4>
                                    </div>
                                    <div className="col-md-7 text-end">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="dropdown">
                                                    <a className="btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="fas fa-chevron-down"></i>
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <li><a className="dropdown-item" href="https://en.wikipedia.org/wiki/Wikipedia:Disruptive_user" target="_blank">Report User</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <Link to="/ProfileSettings" className="card-text-settings-icon">
                                                    <i className="fas fa-cog"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        {isOwnProfile ? <></> : <button onClick={handleFriendRequest} type="button" className="btn btn-primary mb-4 alert-info-decline"><i class="fas fa-user-plus mx-2"></i>Follow</button> }
                                    </div>
                                </div>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <p className="your-bio mb-5">
                                            {bio}
                                            <button type="button" className="edit-bio" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-plus fa-xs"></i></button>
                                        </p>
                                        <ModalBio bio={bio} updateBio={updateBio} />
                                    </div>
                                    <div className="col-12 mt-5">
                                        <h3>My Swaps</h3>
                                        <BookCarousel />
                                    </div>
                                    <div className="col-12">
                                        <h3>Books to Swap</h3>
                                        <BookCarousel />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : <div>Loading</div>;
};
