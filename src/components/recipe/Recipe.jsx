import React from "react";
import "./recipe.css"; // Assuming you have custom styles
import foodImage2 from "../../assets/foodImage2.jpg";

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
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container text-center mt-5">
        <h4 className="upgrade-heading mb-4">
          <strong>Upgrade to Premium for More Meals</strong>
        </h4>
        <button type="button" className="btn btn-primary btn-lg">
          Upgrade Now
        </button>
      </div>
      <div className="recipes-section mt-5">
        <h3 className="recipes-heading">
          Try one of our Delicious and Balanced Recipes
        </h3>
        <h5 className="whats-hot-heading">What's Hot</h5>
      </div>
    </div>
  );
};

export default Recipe;

// import React from "react";
// import "./recipe.css";
// // import Hero from "../hero/Hero";

// const Recipe = () => {
//   return (
//     <div className="gpt3__possibility section__padding" id="possibility">
//         {/* <Hero /> */}
//       <div className="gpt3__possibility-content">
//         <div className="container">
//           <div className="container text-center">
//             <h1 className="gradient__text">
//             Nutrition Made Easy.
//             </h1>
//             <div className="row">
//               <div className="col text-start">
//                 <h4>
//                   "Welcome to Nourish, where culinary adventures await! Dive
//                   into a world of tantalizing flavors, aromatic spices, and
//                   mouthwatering dishes that will tantalize your taste buds and
//                   ignite your passion for cooking. From sizzling stir-fries to
//                   decadent desserts, our diverse collection of recipes caters to
//                   every craving and skill level. Whether you're a seasoned chef
//                   or a kitchen newbie, our easy-to-follow recipes, vibrant
//                   photos, and helpful tips will empower you to create delicious
//                   meals that will impress family and friends alike. Get ready to
//                   embark on a delicious journey and discover the joy of cooking
//                   with NourishNav!"
//                 </h4>
//               </div>
//               <div className="col">Column</div>
//               <div className="col">image</div>
//             </div>
//           </div>
//           <h4>
//             <strong>Upgrade to Premium for More Meals</strong>
//           </h4>
//           <button type="button" className="btn btn-primary btn-sm">
//             Small button
//           </button>
//         </div>

//         <h3>
//           <strong>Try one of our Delicious and Balanced Recipes</strong>
//         </h3>
//         <h5>What's Hot</h5>
//       </div>
//     </div>
//   );
// };

// export default Recipe;
