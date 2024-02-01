import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const ProfileBio = () =>  {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

//   const joinedDate = format(new Date(user.created_at), 'MMMM RRRR')

  useEffect(() => {

    const userId = "123"; // reemplazar por el token

    // Fetch user data by ID
    actions.getUserById(userId);

    // Fetch the list of followed and followers
    actions.getFollowedList();
    actions.getFollowersList();
  }, []);

  const user = store.users.length > 0 ? store.users[0] : {};

  return (
    <Container>
      <div className="topBio">
        <div className="image">
          {' '}
          <img src={user.data?.image} alt="" />
        </div>
      </div>
      <div className="detailsBio">
        <span className="user__name">{user.data?.name}</span>
        <span className="user__id">@{user.id}</span>

        {/* Estaría bueno agregar este dato en el perfil */}
        {/* <div className="user__joined">
          <i class="fa-regular fa-calendar" color="#777" size={20}></i>
          <span className="user__joined--text">Joined {joinedDate}</span>
        </div> */}

        <div className="user__follows">
          <span className="user__follows__following">
            <b>{store.followed.length || 0}</b> Following
          </span>
          <span className="user__follows__followers">
            <b>{store.followers.length || 0}</b> Followers
          </span>
        </div>
        <div className="user__followed-by">
          Not followed by anyone you are following
        </div>
      </div>
    </Container>
  );
};


