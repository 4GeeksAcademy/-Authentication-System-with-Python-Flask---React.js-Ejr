import React from "react";
import { InlineWidget } from "react-calendly";
import "../../../styles/User-styles/calendar.css";


const Calendly = () => {
  return (

    <div className="calendly-container">
      <InlineWidget
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
      />
    </div>

  );
};

export default Calendly;