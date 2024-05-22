import React from "react";
import { InlineWidget } from "react-calendly";
import { PopupButton } from "react-calendly";
import { PopupWidget } from "react-calendly";
import "../../../styles/User-styles/calendar.css";


const Calendly = () => {
  return (

    <div className="calendly-container">

      <PopupButton
        url="https://calendly.com/josejoakin10"
        rootElement={document.getElementById("app")}
        text="Click here to schedule a training session!"
        className="calendly-button"

      />
    </div>

  );
};

export default Calendly;


{/* <PopupWidget
        url="https://calendly.com/josejoakin10"
        
        rootElement={document.getElementById("root")}
        text="Click here to schedule!"
        textColor="#ffffff"
        color="#00a2ff"
      /> */}

{/* <InlineWidget
        url="https://calendly.com/josejoakin10"
        styles={{
          height: "100%",
          width: "100%",
        }}
        pageSettings={{
          backgroundColor: "#001004",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "#02b532",
          textColor: "#F5F5F5",
        }}
      /> */}