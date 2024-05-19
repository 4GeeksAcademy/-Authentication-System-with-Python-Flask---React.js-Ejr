import React from "react";
import { InlineWidget } from "react-calendly";

const Calendly = () => {
  return (
    <div className="calendly-container">
      <InlineWidget
        url="https://calendly.com/josejoakin10"
        styles={{
          height: "50rem",
        }}
        pageSettings={{
          backgroundColor: "252C44",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "00a2ff",
          textColor: "fbfbfb",
        }}
      />
    </div>
  );
};

export default Calendly;