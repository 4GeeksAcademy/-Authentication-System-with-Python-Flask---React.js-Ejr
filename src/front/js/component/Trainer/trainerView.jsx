import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


const trainerView = () => {




  return (
    <div className="userCard">
      <h1>User</h1>
      <Link to="/TrainerUserDetail">
        <button>Details</button>
      </Link>
    </div>
  );

}

export default trainerView
