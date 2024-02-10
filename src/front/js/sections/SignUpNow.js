// AboutSection.js

import React from 'react';
import AboutImage from '/workspaces/europe-fs-pt-14-ryandornan-mariahurtado/src/front/img/music/crowd-02.png';
import { Link } from "react-router-dom";


const SignUpNow = () => {
  return (
    <div className="container-full black-background">
      <div className="container sign-up d-flex justify-content-center align-items-center">
        {/* Left Column - Image */}
        <div className="col-md-5 mb-4 image-container">
          <img
            src={AboutImage}
            className="img-fluid"
            alt="Crowd at a Music Event"
          />
        </div>

        {/* Right Column - Sign Up Now Text */}
        <div className="col-md-5 mb-4 pink-div">
          <h2 className="sign-up-header mb-4">Ready to take your event to the next level?</h2>

          <p>
          Join Eventure and gain access to a world of possibilities. 
          Whether you're organizing a concert, workshop, or art exhibition, 
          Eventure makes it easy to promote your event and connect with your audience.
          </p>

          <p>
          Sign up now and start making your event a success with Eventure!
          </p>


          
        {/* View All Events Button */}
        <Link to="/sign-up">
          <button
            className="btn btn-secondary custom-btn-dark mt-5"
            id="signUpNow"
          >
            Sign Up Now
          </button>
        </Link>

          

        </div>
      </div>
    </div>
  );
};

export default SignUpNow;