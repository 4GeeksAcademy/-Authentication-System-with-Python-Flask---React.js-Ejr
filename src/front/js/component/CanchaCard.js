import React, { useState } from "react";
import "../../styles/CanchaCard.css";

const CanchaCard = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "https://cdn.versacourt.com/cmss_files/imagelibrary/general-use/thb-court-size.jpg",
    "https://www.totalsportsolutions.ca/Content/images/product_main/sm/20'x28'-Backyard-Basketball-Court-Raptors-logo-King-City-ON.v637853122246000843.jpg",
    "https://www.snapsports.com/wp-content/uploads/2023/05/orange-gray-header.jpg"
  ];

  const handleMouseEnter = () => {
    const imageTimer = setTimeout(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    setImageTimer(imageTimer);
  };

  const handleMouseLeave = () => {
    clearTimeout(imageTimer);
  };

  let imageTimer;

  return (
    <section className="dark">
      <div className="container py-4">
        <h1 className="h1 text-center" id="pageHeaderTitle"></h1>

        <article
          className="postcard dark blue"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a className="postcard__img_link" href="#">
            <img
              className="postcard__img"
              src={images[imageIndex]}
              alt="Image Title"
            />
          </a>
          <div className="postcard__text">
            <h1 className="postcard__title blue">
              <a href="#">Basquetball field "El Toñito"</a>
            </h1>
            <div className="postcard__subtitle small">
              <time dateTime="2020-05-25 12:00:00">
                <i className="fas fa-map-marker-alt mr-2"></i> Providencia,
                Santiago-Chile
              </time>
            </div>
            <div className="postcard__bar"></div>
            {/* Remaining code */}
          </div>
        </article>

        {/* Add other articles for different cards */}
      </div>
    </section>
  );
};

export default CanchaCard;
