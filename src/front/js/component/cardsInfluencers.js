import React from "react";

export const CardsInflu = ({imagen, nombre, username, seguidores, sector}) => {
    return (
        <div className="card " style={{width: "18rem"}}>
            <span class="border border-primary rounded">
            <img src={imagen} class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">{nombre}</h5>
                <ul class="card-text">
                    <li>{username}</li>
                    <li>{seguidores}</li>
                    <li>{sector}</li>
                </ul>
                <button href="#" class="btn btn-primary">Ver más</button>
            </div>
            </span>
        </div>
    );
};