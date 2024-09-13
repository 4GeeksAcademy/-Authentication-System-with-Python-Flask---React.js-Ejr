import React from "react";
import { CardComponent } from "../component/cardGamesRecomended.jsx";
import juego1 from "../../img/games/game_03.jpg";

export const Gamesrecomended = () => {
  return (
    <>
      <section className="py-5 bg-black">
        <div className="container rounded shadow">
          <div className="custom-bg-gamers">
            <h1 className="custom-title-2"> Games Recomended </h1>
            <div className="row mt-5">
              <div className="col-12 col-md-4 mb-4 custom-card-games-recomended">
                <CardComponent
                  // imageSrc="https://via.placeholder.com/150"
                  imageSrc={juego1}
                  title="Card title"
                />
              </div>
              <div className="col-12 col-md-4 mb-4 custom-card-games-recomended ">
                <CardComponent
                  // imageSrc="https://via.placeholder.com/150"
                  imageSrc={juego1}
                  title="Another card title"
                />
              </div>
              <div className="col-12 col-md-4 mb-4 custom-card-games-recomended">
                <CardComponent
                  // imageSrc="https://via.placeholder.com/150"
                  imageSrc={juego1}
                  title="Yet another card title"
                />
              </div>
            </div>
            <div className="col-12 text-center d-flex justify-content-center mt-5 mb-4">
              <button type="submit" className="btn custom-button">
                View more
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
