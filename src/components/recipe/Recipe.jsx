import React from "react";
import "./recipe.css";

const Recipe = () => {
  return (
    <div className="gpt3__possibility section__padding" id="possibility">
      <div className="gpt3__possibility-image">
        {/* <img src={possibilityImage} alt="possibility" /> */}
      </div>
      <div className="gpt3__possibility-content">
        <h4>
          <strong>Upgrade to Premium for More Meals</strong>
        </h4>
        <h1 className="gradient__text">
          The possibilities are beyond your imagination
        </h1>
        <p>
          "Welcome to Nourish, where culinary adventures await! Dive into a
          world of tantalizing flavors, aromatic spices, and mouthwatering
          dishes that will tantalize your taste buds and ignite your passion for
          cooking. From sizzling stir-fries to decadent desserts, our diverse
          collection of recipes caters to every craving and skill level. Whether
          you're a seasoned chef or a kitchen newbie, our easy-to-follow
          recipes, vibrant photos, and helpful tips will empower you to create
          delicious meals that will impress family and friends alike. Get ready
          to embark on a delicious journey and discover the joy of cooking with
          NourishNav!"
        </p>
        <h3>
          <strong>Try one of our Delicious and Balanced Recipes</strong>
        </h3>
        <h5>What's Hot</h5>
        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col">
              <div className="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col">Image 3 One of three columns</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
