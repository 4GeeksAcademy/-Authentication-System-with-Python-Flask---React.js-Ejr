import React from "react";
import Card from "../component/reviewsLibros/Card";

const ProfileUser = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Card />
        </div>
        <div className="col-md-6">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
