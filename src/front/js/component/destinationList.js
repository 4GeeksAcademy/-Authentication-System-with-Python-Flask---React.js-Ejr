import React from "react";
import destinationSearch from "./destinationSearch";

function destinationList({favorites, onDestinationFavorite}){
    const favoritesArray = favorites.map((favorite) => {
        return <destinationList
            key={favorites.id}
            favorite={favorite}
            onDestinationFavorite={onDestinationFavorite}

        />
    });

    return(
        console.log("i am working destinationList function ")
        // {favoritesArray}

    );

}

export default destinationList ;