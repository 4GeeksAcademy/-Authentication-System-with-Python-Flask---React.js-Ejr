import React from "react";
import { useNavigate } from "react-router-dom";

const CloseChat = () => {
  const home = "/homedueno";
  let navigate = useNavigate();

  const handleLogOut = () => {
    navigate(home);
  };

  return (
    <div className="container">
      <i
        className="fas fa-chevron-left"
        type="button"
        onClick={handleLogOut}
      ></i>
    </div>
  );
};

export default CloseChat;
