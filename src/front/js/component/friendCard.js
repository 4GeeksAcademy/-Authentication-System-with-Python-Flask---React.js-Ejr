import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const FriendCard = () => {
  return (

    <div className="friends_list">
      <div className="card mb-3" style={{ border: "none" }}>
        <div className="row g-0">
          <div className="col-md-2 mx-auto">
            <img src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" className="card-img-top" alt="..." />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">Name Surname</h5>
              <div className="row">
                <div className="col">
                  <a href="#" className="trash">Delete Friend</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

