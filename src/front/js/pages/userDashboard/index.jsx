import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { obtainInfo } from "../../service/user";
import { useNavigate } from "react-router-dom";
// import Calendar from "../../components/calendar/calendar.jsx";
import "../../pages/userDashboard/styles.css";
// import Time from "../../components/time/time.jsx";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const navigate = useNavigate();
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await obtainInfo();
      console.log(userData, "datauserdash");
      setUser(userData);
      actions.saveUserProfileData(userData);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
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
        <div className="calendar">
          {/* <Calendar
            onChange={setDate}
            value={date}
            onClickDay={() => setShowTime(true)}
          /> */}
          <div className="selected-date text-center">
            Selected Date: {date.toDateString()}
          </div>
        </div>
      </div>
      {/* <div>
        <Time className="selected-time" showTime={showTime} date={date} />
<<<<<<< HEAD
      </div>
=======
      </div> */}
>>>>>>> 9e02085e0982d4b8458da57ebe0f6cdb6231227f
      <button onClick={handleSubmit}>profile</button>
    </div>
  );
};

export default UserDashboard;
