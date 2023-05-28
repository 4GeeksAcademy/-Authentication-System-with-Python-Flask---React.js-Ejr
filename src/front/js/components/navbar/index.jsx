import React from "react";
import { Link, useNavigate } from "react-router-dom";
import navuno from "../../../../assets/navbar1.png";
import navdos from "../../../../assets/navbar2.png";
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handlesubmit = () => {
    navigate("/");
  };
  return (
    <nav className="navbar ">
      <div className="container">
        <div className="image-container">
          <img className="img2" src={navuno} alt="navuno" />
          <img className="img" src={navdos} alt="navdos" />

          <Link to="/" className="route">
            Booking Manager.
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/" className="me-3">
            <button type="submit" className="submitBtn boxShadow">
              Home
            </button>
          </Link>
          <Link to="/" className="me-5">
            <button type="submit" className="submitBtn boxShadow">
              Dashboard
            </button>
          </Link>
          <Link to="/" className="iconTools me-2">
            <i className="fa-solid fa-gear fa-2x"></i>
          </Link>

          <Link to="/" className="iconTools me-4">
            <i className="fa-solid fa-share-from-square fa-2x"></i>
          </Link>

          <img
            className="profile"
            src="https://pbs.twimg.com/profile_images/1243475459125456896/e-zIQiFY_400x400.jpg"
            alt="Daenerys Targaryen"
            onClick={handlesubmit}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
