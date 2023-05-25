import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { getInfoUser } from "../../service/user";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getInfoUser();
      console.log(userData, "datauserdash");
      setUser(userData);
      actions.saveUserProfileData(userData);
    };

    fetchUser();
  }, []);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }
  const handleSubmit = () => {
    navigate(`/profile/${user.id}`);
  };
  return (
    <div>
      <div className="services-box">
        <div className="bg">
          <div className="d-flex align-items-center">
            <img src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"></img>
            <h1>Worker</h1>
          </div>
          <div>
            <h2>Next Services:</h2>
          </div>
          <div></div>
        </div>
      </div>
      <button onClick={handleSubmit}>profile</button>
    </div>
  );
};

export default UserDashboard;
