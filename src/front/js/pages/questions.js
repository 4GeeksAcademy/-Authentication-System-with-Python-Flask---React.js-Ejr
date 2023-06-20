import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";




export const Questions = () => {
  const { store, actions } = useContext(Context);



  return (
    <div style={{ backgroundColor: '#264653', color: '#000' }}>
      <div className="container" >
        <h1>Our Services</h1>
        <div className="accordion my-3" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                How often I should do it?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
              <div className="accordion-body">
                The frequency of car washes will depend on your driving style and desired level of cleanliness. Consider your driving style first. Do you commute only a short distance to work, parking your vehicle in a garage all day? Do you have a longer commute, in which case leaving your car exposed to the weather—rain, sun, dust, bird droppings—would put it at risk? You should wash your automobile more frequently depending on how frequently you drive it and the factors it encounters.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Can water damage my car engine way?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
              <div className="accordion-body">
                Maintaining a clean engine bay is critical for the longevity and performance of your vehicle's engine. While immediately spraying water into the engine bay might seem like a simple fix, it can actually do a lot of harm. It's ideal to either hire a specialized detailer like <strong>StarWash </strong> to clean your engine bay or if you prefer to do it yourself, be sure to follow the instructions we provided for safe and efficient engine bay cleaning. Keep in mind that maintaining your car's engine will ensure it runs smoothly and safely for many years to come.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                Why our service is the perfect solution for busy people?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
              <div className="accordion-body">
                At the end of the day, StarWash is all about making time for the little things. It's about giving your car the care and attention it needs while still allowing you to concentrate on other important aspects of your life. Therefore, if you're a busy person who's tired of sacrificing time and energy for car maintenance, consider giving mobile detailing a try. With its convenience, expertise, personal touch, and potential for savings, it just might be the perfect solution you've been looking for. And who knows - maybe a clean and sparkling car will even help make your busy days a little brighter.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                Do you come to me?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
              <div className="accordion-body">
                Yes, we’re a fully-contained mobile detailing unit. We can perform the wash at your home or apartment.  All we need is a water spout and electrical outlet to perform the detail on your car.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                How long does this service take?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
              <div className="accordion-body">
                Generally speaking, at least takes 1.5 hours, but it will vary depending on the size and condition of the car.
              </div>
            </div>
          </div>
        </div>
        <h1>Interior Services</h1>
        <div className="accordion my-3" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Why would I get my car interior detailed?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
              <div className="accordion-body">
                There's nothing quite like getting in the car and feeling like you're sitting on the most luxurious sofa in the world.
                It's a feeling that emanates from your very own dream car, and it's one that you can only get when you have a professional detailer clean your interior.
                But how do you get your dream car to look as good as new? And how do you keep it looking that way for long? These are questions many people ask themselves when they see their car looking dull, or worse—dirtied up from years of neglect.
              </div>
            </div>
          </div>
   
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                How long does it take for my seats and carpets to dry?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
              <div className="accordion-body">
                If it’s relatively warm outside with low humidity, your vehicle will be 85% dry by the time we’re done. If it’s cold or raining, then it’ll take longer for your  interior to dry due to the climate.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                Do you remove seats?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
              <div className="accordion-body">
                At this time, we do not. Your seats are one of the most important parts to keep you safe. We would not want to disconnect or move anything around that would compromise that. We have several machines and brushes that allow us to thoroughly clean around the seat to remove most stains.
              </div>
            </div>
          </div>
        </div>
        <h1>Exterior Services</h1>
        <div className="accordion  py-3 " id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Does this service include a wax?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
              <div className="accordion-body">
                Yep! This wash comes with a spray wax that will give your car 3 months worth of shine and protection. I advise you to check out our paint protection and ceramic coating pages for a deeper level of shine and protection.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Do you do group washes?
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
              <div className="accordion-body">
                We do provide group washes, but do not provide a discount. Each car is priced accordingly.
              </div>
            </div>
          </div>

        </div>



      </div>
    </div>
  );
};
