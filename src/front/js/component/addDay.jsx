import React from "react";
import AccordionContainer from "./accordionContent.jsx";
import { DATA_LIST } from "./data/data.js";
import BlueButton from "./buttons/blueButton.jsx";

export const AddDay = () => {
  return (
    <div className="col-4 my-5 mx-5">
        <div className="d-flex flex-column align-items-center">
            {DATA_LIST.map((data) => (
                <div className="mx-auto w-100" key={data.id}>
                    <AccordionContainer title={data.title} key={data.id}>
                    <ul>
                        {data.content.map((location, index) => (
                        <li key={index}>{location}</li>
                        ))}
                    </ul>
                    </AccordionContainer>
                </div>
            ))}
            <BlueButton 
                buttonName={'Añadir día'} 
                icon={<i
                    className=" me-2 fa-solid fa-plus fa-lg"
                    style={{ color: "white" }}
                />}
                toggle={'modal'}
                target={'#createDay'}
            />
        </div>
    </div>
  );
};