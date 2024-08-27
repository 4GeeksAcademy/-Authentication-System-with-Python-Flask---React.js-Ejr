import React, { useContext, useState, useEffect } from "react";
import AccordionContainer from "./accordionContent.jsx";
import { DATA_LIST } from "./data/data.js";
import BlueButton from "./buttons/blueButton.jsx";
import { Context } from "../store/appContext.js";
import ActivityModal from "./activityModal.jsx";

export const AddDay = () => {
  const { store, actions } = useContext(Context);
  const itineraryDataKeys = Object.keys(store.newItineraryData.itinerary);

  const deleteDay = (e) => {
    actions.deleteDay(e);
    console.log("click", e);
  };

  return (
    <div className="col-5 my-5 mx-5">
      <div className="d-flex flex-column align-items-center">
        {itineraryDataKeys?.map((key, index) => (
          <div className="mx-auto w-100" key={index}>
            <AccordionContainer
              id={index}
              title={key}
              del={
                <i key={key} onClick={deleteDay} className="bi bi-trash3"></i>
              }
            >
              <ul>
                {store.newItineraryData.itinerary[key].map(
                  (location, index) => (
                    <li key={index}>{location}</li>
                  )
                )}
              </ul>
            </AccordionContainer>
          </div>
        ))}
        <BlueButton
          buttonName={"Añadir día"}
          // icon={<i
          //     className=" me-2 fa-solid fa-plus fa-lg"
          //     style={{ color: "white" }}
          // />}
          icon={<i className="bi bi-plus-lg"></i>}
          toggle={"modal"}
          target={"#createDay"}
        />
      </div>
      <ActivityModal />
    </div>
  );
};
