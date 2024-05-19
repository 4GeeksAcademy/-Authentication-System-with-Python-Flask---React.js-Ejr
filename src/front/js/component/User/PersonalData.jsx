import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../store/appContext";
import { useNavigate } from 'react-router-dom';
import Loader from "../User/loader.jsx";

import "../../../styles/User-styles/PersonalData.css";

const PersonalData = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.user_data) {
      actions.fetchUserData();
    }
  }, [store.user_id]);

  const handleEditForm = () => {
    navigate("/user/edit_form");
  }

  if (!store.user_data) {
    return (
      <>
        <h4>Loading...</h4>
        <Loader />
      </>
    );
  }

  return (
    <div className='personalData'>
      <div className='user-info'>
        <p className='dataForm'>Full Name: {store.user_data.user_name}</p>
        <p className='dataForm'>Weight: {store.user_data.user_weight}</p>
        <p className='dataForm'>Illness: {store.user_data.user_illness}</p>
        <p className='dataForm'>Height: {store.user_data.user_height}</p>
        <p className='dataForm'>Objectives: {store.user_data.user_objetives}</p>
      </div>
      <button onClick={handleEditForm} className="edit-user-btn">Edit User Info</button>
    </div>
  );
};

export default PersonalData;
