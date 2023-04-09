import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
//importe componentes desde fontawesome
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHandBackFist,
  faHand,
  faHandScissors,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHandBackFist, faHand, faHandScissors);

export const CardsGroup = () => {
  const { store, actions } = useContext(Context);
  const [buttonId, setButtonId] = useState("");

  return (
    <div className="container d-flex">
      <div className="row flexCards">
        {store.gameRules.map((elemento) => {
          return (
            <div className="col-4">
              <Card
                style={{ width: "15rem", height: "20rem" }}
                key={elemento.id}
                className="cards"
              >
                <Card.Img variant="top" />
                <FontAwesomeIcon
                  icon="fa-hand"
                  className="hand"
                  id={elemento.name}
                />
                <Card.Body>
                  <Card.Title>{elemento.name}</Card.Title>
                  <Card.Text>{elemento.rule}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setButtonId(elemento.name);
                      actions.storePlayerValue(buttonId);
                    }}
                  >
                    Go for {elemento.name}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
