import React, { useEffect, useContext } from "react";
import { CardComponentGames } from "../component/cardGamesRecomended.jsx";
import { Context } from "../store/appContext";

export const Gamesrecomended = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getGamesRecomended(3);
  }, []);

  return (
    <section className="py-5 bg-black">
      <div className="container rounded shadow">
        <div className="custom-bg-gamers">
          <h1 className="custom-title-2"> Games Recomended </h1>
          <div className="row mt-5">
            {store.games && store.games.length > 0 ? (
              store.games.map((game, index) => (
                <div
                  key={index}
                  className="col-12 col-md-4 mb-4 custom-card-games-recomended"
                >
                  <CardComponentGames
                    imageSrc={
                      game.background_image || "https://via.placeholder.com/150"
                    }
                    title={game.name}
                  />
                </div>
              ))
            ) : (
              <p>No games available</p>
            )}
          </div>
          <div className="col-12 text-center d-flex justify-content-center mt-5 mb-4">
            <button type="submit" className="btn custom-button">
              View more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
