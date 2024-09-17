import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CardComponent } from "./cardMatchGamers.jsx";
import { CardComponentGames } from "./cardGamesRecomended.jsx";
import { SessionCard } from "./profile_sessionsCard.jsx";
import perfil from "../../img/perfil/perfil-1.png";
import sessionImage1 from "../../img/match/imagen-match.jpg";
import juego1 from "../../img/games/game_03.jpg";

export const UserInformation = ({
  profile_img_url,
  username,
  first_name,
  last_name,
  description,
  steam_id,
  discord_id,
  platforms,
  games,
}) => {
  return (
    <>
      <div className="user-information ">
        <section id="profile_information">
          <div className="row align-items-start">
            <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
              <img
                src={profile_img_url}
                className="img-thumbnail circular-image"
                alt=""
              />
            </div>
            <div className="col-12 col-md-8 mb-4">
              <h3>
                <span className="ms-5">{username}</span>
              </h3>
              <div className="personal-data mt-2">
                <p className="ms-5">
                  <strong>
                    {first_name} {last_name}
                  </strong>
                </p>
              </div>
              <div className="description mt-2 ms-5">
                <span>{description}</span>
              </div>
              <div className="social-links mt-4 ms-5">
                <p className="d-flex justify-content-start flex-wrap">
                  <a
                    href={steam_id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-3"
                  >
                    <i className="fab fa-youtube fa-2x"></i>
                  </a>
                  <a
                    href={discord_id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-3"
                  >
                    <i className="fab fa-discord fa-2x"></i>
                  </a>
                  <a
                    href={discord_id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitch fa-2x"></i>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-12 col-md-2 d-flex justify-content-center align-items-start py-3">
              <Link to="/">
                <button type="button" className="btn custom-button me-5">
                  Connect
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section
          id="profile_platforms"
          className="background-user-platforms mt-5 custon-border"
        >
          <div className="row">
            <div className="col-12 text-center mb-3">
              <h3>Platforms</h3>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <div className="row justify-content-center ">
                {platforms.map((platform, index) => (
                  <div key={index} className="col-md-4 mb-3 mt-3">
                    <div
                      className="card text-center custom-card-platforms"
                      style={{ minWidth: "12rem" }}
                    >
                      <div className="card-body">
                        <i
                          className={`${platform.prefix} fa-${platform.icon} fa-2x`}
                        ></i>
                        <h5 className="card-title">{platform.name}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div>
          <section
            id="profile_games"
            className="background-user-platforms mt-5 custon-border"
          >
            <div className="row ">
              <div className="col-12 text-center mb-3">
                <h3>Games</h3>
              </div>
              <div className="col-12 d-flex justify-content-center ">
                <div className="row justify-content-center ">
                  {games.map((game, index) => (
                    <div key={index} className="col-md-6 mb-3 mt-3">
                      <div
                        className="card text-center custom-card-games"
                        style={{ minWidth: "12rem" }}
                      >
                        <div className="card">
                          <img
                            src={game.image_url}
                            alt=""
                            className="img-fluid"
                            style={{
                              objectFit: "cover",
                              height: "200px",
                              width: "100%",
                            }}
                          />
                          <div
                            className="card-footer"
                            style={{ backgroundColor: "#575757" }}
                          >
                            <h5>{game.title}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section id="profile_games">
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="rounded mt-5 custom-card-friends align-items-center text-center p-3">
                  <h3 className="p-3">Amigos</h3>
                  <div>
                    <CardComponent
                      imageSrc={perfil}
                      username="@ Player Name 1"
                      buttonText="ver perfil"
                    />
                    <CardComponent
                      imageSrc={perfil}
                      username="@ Player Name 2"
                      buttonText="ver perfil"
                    />
                    <CardComponent
                      imageSrc={perfil}
                      username="@ Player Name 3"
                      buttonText="ver perfil"
                    />
                    <CardComponent
                      imageSrc={perfil}
                      username="@ Player Name 4"
                      buttonText="ver perfil"
                    />
                    <CardComponent
                      imageSrc={perfil}
                      username="@ Player Name 2"
                      buttonText="ver perfil"
                    />
                    <CardComponent
                      imageSrc={perfil}
                      username="@ Player Name 3"
                      buttonText="ver perfil"
                    />
                    <CardComponent
                      imageSrc={perfil}
                      username="@ Player Name 4"
                      buttonText="ver perfil"
                    />
                    <CardComponent
                      imageSrc={perfil}
                      username="@ Player Name 4"
                      buttonText="ver perfil"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-8">
                <div className="rounded mt-5 custom-card-friends p-3 mt-3">
                  <h3 className="text-start">Sesiones</h3>
                  <div>
                    <SessionCard
                      imageSrc={sessionImage1}
                      gameName="Let’s Play Starcraft"
                      time="22:00"
                      date="11/09/2024"
                      players="4"
                    />
                    <SessionCard
                      imageSrc={sessionImage1}
                      gameName="Let’s Play Starcraft"
                      time="22:00"
                      date="11/09/2024"
                      players="4"
                    />
                    <SessionCard
                      imageSrc={sessionImage1}
                      gameName="Let’s Play Starcraft"
                      time="22:00"
                      date="11/09/2024"
                      players="4"
                    />
                    <SessionCard
                      imageSrc={sessionImage1}
                      gameName="Let’s Play Starcraft"
                      time="22:00"
                      date="11/09/2024"
                      players="4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section id="profile_games_user">
            <div className="rounded mt-5">
              <div className="custom-bg-gamers">
                <h1 className="custom-title-2"> My games </h1>
                <div className="row mt-5">
                  <div className="col-12 col-md-4 mb-4 custom-card-games-recomended">
                    <CardComponentGames
                      // imageSrc="https://via.placeholder.com/150"
                      imageSrc={juego1}
                      title="Card title"
                    />
                  </div>
                  <div className="col-12 col-md-4 mb-4 custom-card-games-recomended ">
                    <CardComponentGames
                      // imageSrc="https://via.placeholder.com/150"
                      imageSrc={juego1}
                      title="Another card title"
                    />
                  </div>
                  <div className="col-12 col-md-4 mb-4 custom-card-games-recomended">
                    <CardComponentGames
                      // imageSrc="https://via.placeholder.com/150"
                      imageSrc={juego1}
                      title="Yet another card title"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

UserInformation.propTypes = {
  profile_img_url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  steam_id: PropTypes.string.isRequired,
  discord_id: PropTypes.string.isRequired,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      prefix: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
