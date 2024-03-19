import { useState } from "react";
import React from "react";
import "../../styles/metrics.css";

export default function Metrics() {
  const [top, setTop] = useState(false);
  const [middle, setMiddle] = useState(false);
  const [bottom, setBottom] = useState(false);

  function handleBottle() {
    if (bottom === false) {
      setBottom(true);
    } else if (middle === false) {
      setMiddle(true);
    } else if (top === false) {
      setTop(true);
    }
  }

  const Water = () => {
    const [waterDrank, setWaterDrank] = useState("blue");

    return (
      <div class="bottle" onClick={(e) => handleBottle()}>
        <div class={top === true ? "top active" : "top"}></div>
        <div class={middle === true ? "middle active" : "middle"}></div>
        <div class={bottom === true ? "bottom active" : "bottom"}></div>
      </div>
    );
  };
}
