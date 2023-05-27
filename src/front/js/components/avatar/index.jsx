import React from "react";
import "./styles.css";
import avatarImg from "../../../../assets/avatar.png";

const Avatar = ({ url, ...rest }) => {
  return (
    <div {...rest}>
      <img className="avatar" src={url ? url : avatarImg} alt="profile image" />
    </div>
  );
};

export default Avatar;
