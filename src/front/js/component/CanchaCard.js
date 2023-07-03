import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/CanchaCard.css";
import { Link } from 'react-router-dom';

const CanchaCard = ({ cancha }) => {
  const canchaTypeIcon = {
    Tenis: <i className="fa-solid fa-racquet"></i>,
    Football: <i className="fa-solid fa-futbol"></i>,
    Paddle: <i className="fa-solid fa-table-tennis-paddle-ball"></i>,
    Basketball: <i className="fa-solid fa-basketball"></i>,
    Babyfutbol: <i className="fa-duotone fa-futbol"></i>
  };

  const getSportTypeIcon = () => {
    const sportType = cancha.sportType;
    return canchaTypeIcon[sportType] || null;
  };

  return (
    <section className="dark">
      <div className="container py-4">
        <h1 className="h1 text-center" id="pageHeaderTitle"></h1>

        <article className="postcard dark blue">
          <a className="postcard__img_link" href="#">
            <img
              className="postcard__img"
              src="https://cdn.versacourt.com/cmss_files/imagelibrary/general-use/thb-court-size.jpg"
              alt="Image Title"
            />
          </a>
          <div className="postcard__text">
            <h1 className="postcard__title blue">
              <a href="#"> {cancha.name}</a>
            </h1>
            <div className="postcard__subtitle small">
              <time dateTime="2020-05-25 12:00:00">
                <i className="fas fa-map-marker-alt mr-2"> </i> {cancha.location}
              </time>
            </div>
            <div className="postcard__bar"></div>
            <ul className="postcard__tagbox">
              <li className="tag__item">
                {getSportTypeIcon() ? getSportTypeIcon() : <i className="fas fa-tag mr-2"></i>} {cancha.sportType}
              </li>
              <li className="tag__item">
                <i className="fa -solid fa-person mr-2"></i> {cancha.user.name} {cancha.user.lastname}
              </li>
              <li className="tag__item play blue btn">
                <a href="#">
                  <i className="fas fa-basketball-ball mr-2"></i> Arrendar
                </a>
              </li>
            </ul>
          </div>
        </article>

        {/* Add other articles for different cards */}
      </div>
    </section>
  );
};

export default CanchaCard;


  // const handleMouseEnter = () => {
  //   const imageTimer = setTimeout(() => {
  //     setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 2000);
  //   setImageTimer(imageTimer);
  // };

  // const handleMouseLeave = () => {
  //   clearTimeout(imageTimer);
  // };

  // let imageTimer;



                // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}