import React from "react";
import "./styles.css";
import { avatar } from "../../../../assets/assets.jsx";

const Avatar = ({ url, ...rest }) => {
  return (
    <div {...rest}>
      <img className="avatar" src={url ? url : avatar} alt="profile image" />
    </div>
  );
};

export default Avatar;
