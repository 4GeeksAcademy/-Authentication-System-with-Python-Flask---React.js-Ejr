import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/appointmentconfirmed.css";
import logoAutoAgenda from "../../img/autoagendalogo1080.png";
import trustpilotLogo from "../../img/trustpilotlogo.png";
import googleReviewsLogo from "../../img/googlereviewslogo.png";

const AppointmentConfirmed = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div id="content">
      <div className="card padding">
        <div className="card-body">
          <h1 className="card-header text-center">Appointment Confirmed!</h1>
          <p className="appointment-description text-center">
            Thank you for confirming your appointment with us.
            <br />
            A confirmation email has been sent to your provided email address.
            <br />
            <br />
            Please take a moment to rate us on:
          </p>
          <div className="d-flex justify-content-center">
            <a
              href="https://www.trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-5"
              style={{ marginRight: "2rem" }}
            >
              <img src={trustpilotLogo} alt="TrustPilot Logo" width="100" />
            </a>
            <a
              href="https://business.google.com/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-5"
              style={{ marginLeft: "2rem" }}
            >
              <img
                src={googleReviewsLogo}
                alt="Google Reviews Logo"
                width="100"
              />
            </a>
          </div>
          <div className="text-center mt-4">
            <button onClick={backToHome} className="btn btn-secondary">
              Back to Home
            </button>
            <img
              src={logoAutoAgenda}
              className="autoAgendaLogo"
              alt="AutoAgenda Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmed;
