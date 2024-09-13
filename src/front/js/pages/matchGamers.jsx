import React from "react";
import { CardComponent } from "../component/cardMatchGamers.jsx";
import portada from "../../img/match/imagen-match.jpg";
import perfil from "../../img/perfil/perfil-1.png";
import perfil2 from "../../img/perfil/perfil-2.png";

export const MatchGamers = () => {
  const handleButtonClick = () => {
    alert("Button clicked!");
  };

  return (
    <>
      <section className="py-5 bg-black">
        <div className="container rounded shadow">
          <div className="custom-bg-gamers">
            <h1 className="custom-title-2">Match Gamers</h1>
            <div className="row">
              <div className="col-lg-4 mt-4">
                <div className="card border-card-match-gamers">
                  <img
                    src={portada}
                    className="card-img-top rounded"
                    alt="Main Image"
                    width={400}
                    height={418}
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-lg-3 mb-4 mt-4">
                <CardComponent
                  imageSrc={perfil}
                  username="@ Player Name 1"
                  buttonText="ver perfil"
                  onButtonClick={handleButtonClick}
                />

                <CardComponent
                  imageSrc={perfil2}
                  username="@ Player Name 2"
                  buttonText="ver perfil"
                  onButtonClick={handleButtonClick}
                />
                <CardComponent
                  // imageSrc="https://via.placeholder.com/75"
                  imageSrc={perfil}
                  username="@ Player Name 3"
                  buttonText="ver perfil"
                  onButtonClick={handleButtonClick}
                />
                <CardComponent
                  imageSrc={perfil2}
                  username="@ Player Name 4"
                  buttonText="ver perfil"
                  onButtonClick={handleButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
