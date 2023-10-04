import React, { useContext } from "react";
import bookswaplogo from "../../img/logo-final-project.png";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Buttonsignup } from "../component/btn-signup";
import { Buttonlogin } from "../component/btn-login";
import { ButtonMyProfile } from "../component/btn-myprofile";
import { Buttonlogout } from "../component/btn-logout";

export const Footer = () => {
  const { store } = useContext(Context);

  const loggedOutActions = (
    <>
      <div className="container-fluid py-5">
        <Link to="/create-account" className="btn signup" role="button">
          Create Account
        </Link>
        <Link to="/login" className="btn login ml-2" role="button">
          Log In
        </Link>
      </div>
    </>
  );

  const loggedInActions = (
    <>
      <div className="container-fluid py-5">
        <Link to="/my-profile" className="btn signup" role="button">
          My Profile
        </Link>
        <Buttonlogout />
      </div>
    </>
  );

  return (
    <footer className="footer py-3 text-center">
      <div className="row">
        <div className="col-6 my-5">
          <img src={bookswaplogo} alt="Profile Icon" className="logo" />
        </div>
        <div className="col">
          <div className="row">
            <div className="col-5">
              {store.token ? loggedInActions : loggedOutActions}
            </div>
            <div className="col-5">
              <Link to="/OurBooks" className="nav-link">
                Our Books
              </Link>
              <a className="nav-link" href="#genres-section">
                Genres
              </a>
              <a
                className="nav-link"
                href="https://www.instagram.com"
                target="_blank"
              >
                Instagram
              </a>
              <a
                className="nav-link"
                href="https://www.facebook.com"
                target="_blank"
              >
                Facebook
              </a>
              <a
                className="nav-link"
                href="https://en.wikipedia.org/wiki/Privacy_policy"
                target="_blank"
              >
                Privacy Policy
              </a>
              <a
                className="nav-link"
                href="https://en.wikipedia.org/wiki/Legal_advice"
                target="_blank"
              >
                Legal Advice
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
