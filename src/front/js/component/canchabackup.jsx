import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/CanchaCard.css";

const CanchaCard = ({ index }) => {
  const { store, actions } = useContext(Context);
  const images = [
    "https://cdn.versacourt.com/cmss_files/imagelibrary/general-use/thb-court-size.jpg",
    "https://www.totalsportsolutions.ca/Content/images/product_main/sm/20'x28'-Backyard-Basketball-Court-Raptors-logo-King-City-ON.v637853122246000843.jpg",
    "https://www.snapsports.com/wp-content/uploads/2023/05/orange-gray-header.jpg",
  ];

  const renderCanchas = () => {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
      fetchCanchas();
    }, []);

    const fetchCanchas = async () => {
      try {
        const canchasData = await actions.fetchCanchas();
        console.log(canchasData, "canchasData");
        setCanchas(canchasData);
      } catch (error) {
        console.log("Error fetching canchas:", error);
      }
    };

    const [canchas, setCanchas] = useState([]);

    return canchas.map((cancha, canchaIndex) => {
      return (
        <section className="dark" key={canchaIndex}>
          <div className="container py-4">
            <h1 className="h1 text-center" id="pageHeaderTitle"></h1>

            <article className="postcard dark blue">
              <a className="postcard__img_link" href="#">
                <img
                  className="postcard__img"
                  src={images[imageIndex]}
                  alt="Image Title"
                />
              </a>
              <div className="postcard__text">
                <h1 className="postcard__title blue">
                  <a href="#">{cancha.name}</a>
                </h1>
                <div className="postcard__subtitle small">
                  <time dateTime="2020-05-25 12:00:00">
                    <i className="fas fa-map-marker-alt mr-2"></i>{" "}
                    {cancha.location}
                  </time>
                </div>
                <div className="postcard__bar"></div>
                <ul className="postcard__tagbox">
                  <li className="tag__item">
                    <i className="fas fa-tag mr-2"></i> {cancha.sportType}
                  </li>
                  <li className="tag__item play blue">
                    <a href="#">
                      <i className="fas fa-basketball-ball mr-2"></i> Rent
                    </a>
                  </li>
                </ul>
              </div>
            </article>

            {/* Add other articles for different cards */}
          </div>
        </section>
      );
    });
  };

  return <>{renderCanchas()}</>;
};

export default CanchaCard;
