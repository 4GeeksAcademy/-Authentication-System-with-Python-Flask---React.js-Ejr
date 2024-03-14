import React from "react";

const Water = () => {
  const [waterDrank, setWaterDrank] = useState("blue");
  return (
    <div id="whole-wheat" className="text-center mx-auto">
      <div className="stick"></div>
      <div className="lights">
        <div
          className={activeLight === "blue" ? "blue light" : "blue light"}
          onClick={() => setActiveLight("blue")}
        ></div>
        <div
          className={activeLight === "blue" ? "blue light" : "blue light"}
          onClick={() => setActiveLight("blue")}
        ></div>
        <div
          className={activeLight === "blue" ? "blue light" : "blue light"}
          onClick={() => setActiveLight("blue")}
        ></div>
        <div
          className={activeLight === "blue" ? "blue light" : "blue light"}
          onClick={() => setActiveLight("blue")}
        ></div>
        <div
          className={activeLight === "blue" ? "blue light" : "blue light"}
          onClick={() => setActiveLight("blue")}
        ></div>
        <div
          className={activeLight === "blue" ? "blue light" : "blue light"}
          onClick={() => setActiveLight("blue")}
        ></div>
        <div
          className={activeLight === "blue" ? "blue light" : "blue light"}
          onClick={() => setActiveLight("blue")}
        ></div>
        <div
          className={activeLight === "blue" ? "blue light" : "blue light"}
          onClick={() => setActiveLight("blue")}
        ></div>
      </div>
    </div>
  );
};
