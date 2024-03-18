import React from "react";
import "./recipe.css"; // Assuming you have custom styles
import foodImage2 from "../../assets/foodImage2.jpg";
import buddhaBowl from "../../assets/buddhaBowl.jpg";
import breakfast1 from "../../assets/breakfast1.jpg";
import breakfast2 from "../../assets/breakfast2.jpg";
import breakfast3 from "../../assets/breakfast3.jpg";
import veggieWrap from "../../assets/veggieWrap.jpeg";
import lunch3 from "../../assets/lunch3.jpeg";

const Recipe = () => {
  return (
    <div className="gpt3__possibility section__padding" id="possibility">
      <div className="container text-center">
        <h1 className="gradient__text mb-5">Nutrition Made Easy</h1>
        <p className="recipe-description">
          Welcome to Nourish, where culinary adventures await! Dive into a world
          of tantalizing flavors, aromatic spices, and mouthwatering dishes that
          will tantalize your taste buds and ignite your passion for cooking.
          From sizzling stir-fries to decadent desserts, our diverse collection
          of recipes caters to every craving and skill level. Whether you're a
          seasoned chef or a kitchen newbie, our easy-to-follow recipes, vibrant
          photos, and helpful tips will empower you to create delicious meals
          that will impress family and friends alike. Get ready to embark on a
          delicious journey and discover the joy of cooking with NourishNav!
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <img
              src={foodImage2}
              className="card-img-top"
              alt="Recipe of the Day"
            />
            <div className="card-body">
              <h5 className="card-title">Recipe of the Day</h5>
              <p className="card-text">
                Enjoy our Healthy Salmon Bowl: grilled salmon, quinoa, string
                beans, fresh tomatoes, and zesty citrus dressing. Packed with
                omega-3s, protein, and vitamins, it's a nutritious delight!
              </p>
              <a href="#" className="btn btn-success">
                View Recipe
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="call-to-action">
            <h3>Join Our Newsletter</h3>
            <p>
              Stay updated with our latest recipes, nutrition tips, and special
              offers.
            </p>
            <form>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="Your Email Address"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container text-center mt-5">
        <h4 className="upgrade-heading mb-4">
          <strong>Find your plan</strong>
        </h4>
        <button type="button" className="btn btn-success btn-lg">
          Upgrade Now
        </button>
      </div>
      <div className="recipes-section mt-5">
        <h3 className="recipes-heading">
          Try one of our Delicious and Balanced Recipes
        </h3>
        <h5 className="whats-hot-heading">Breakfast</h5>
        <div className="row">
          {/* Row 1 */}
          <div className="col">
            <div className="card">
              <img
                src={breakfast2}
                className="card-img-top"
                alt="Breakfast 1"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Buddha Bowl</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Delicious and Nutritious
                </h6>
                <p className="card-text">
                  Discover the perfect balance of flavors and nutrients in our
                  Buddha Bowl. Packed with protein, fiber, and essential
                  vitamins.
                </p>
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="col">
            <div className="card">
              <img
                src={breakfast1}
                className="card-img-top"
                alt="Breakfast 2"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Mediterranean Salad</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Fresh and Flavorful
                </h6>
                <p className="card-text">
                  Indulge in the vibrant tastes of the Mediterranean with our
                  refreshing salad. Bursting with fresh veggies, olives, feta
                  cheese, and a tangy vinaigrette.
                </p>
              </div>
            </div>
          </div>
          {/* Row 3 */}
          <div className="col">
            <div className="card">
              <img
                src={breakfast3}
                className="card-img-top"
                alt="Breakfast 3"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Green Smoothie</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Energy Booster
                </h6>
                <p className="card-text">
                  Revitalize your day with our Green Smoothie, packed with
                  leafy greens, fruits, and superfoods. It's the perfect way to
                  fuel your body and mind!
                </p>
              </div>
            </div>
          </div>
        </div>
        <h5 className="whats-hot-heading">Lunch</h5>
        <div className="row">
          {/* Row 1 */}
          <div className="col">
            <div className="card">
              <img
                src={buddhaBowl}
                className="card-img-top"
                alt="Lunch 1"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Buddha Bowl</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Delicious and Nutritious
                </h6>
                <p className="card-text">
                  Discover the perfect balance of flavors and nutrients in our
                  Buddha Bowl. Packed with protein, fiber, and essential
                  vitamins.
                </p>
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="col">
            <div className="card">
              <img
                src={veggieWrap}
                className="card-img-top"
                alt="Lunch 2"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Mediterranean Salad</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Fresh and Flavorful
                </h6>
                <p className="card-text">
                  Indulge in the vibrant tastes of the Mediterranean with our
                  refreshing salad. Bursting with fresh veggies, olives, feta
                  cheese, and a tangy vinaigrette.
                </p>
              </div>
            </div>
          </div>
          {/* Row 3 */}
          <div className="col">
            <div className="card">
              <img
                src={lunch3}
                className="card-img-top"
                alt="Lunch 3"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Green Smoothie</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Energy Booster
                </h6>
                <p className="card-text">
                  Revitalize your day with our Green Smoothie, packed with
                  leafy greens, fruits, and superfoods. It's the perfect way to
                  fuel your body and mind!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
