import React, { useContext } from "react";
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

  return (
    <div className="container">
      <div className="row flexCards">
        {store.gameRules.map((elemento) => {
          return (
            <div className="col-4">
              <Card style={{ width: "15rem" }} key={elemento.id}>
                <Card.Img variant="top" />
                <FontAwesomeIcon
                  icon="fa-hand"
                  className="hand"
                  id="hand"
                  onClick={actions.storePlayerValue}
                />
                <Card.Body>
                  <Card.Title>{elemento.name}</Card.Title>
                  <Card.Text>{elemento.rule}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
