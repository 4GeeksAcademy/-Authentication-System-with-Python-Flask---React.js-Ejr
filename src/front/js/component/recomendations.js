import React from "react";
import avatar from "../../img/avatar.jpg";

const imgStlye = {
  width: "100px",
  height: "auto",
};

const Recomnendations = () => {
  return (
    <div className="row mt-4 mb-4">
      <div className="col-lg-1">
        <img className="rounded-circle mr-2" src={avatar} style={imgStlye} />
      </div>
      <div className="col-lg-11 ml-3">
        <h6>
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose
          (injected humour and the like).
        </h6>
      </div>
    </div>
  );
};

export default Recomnendations;
