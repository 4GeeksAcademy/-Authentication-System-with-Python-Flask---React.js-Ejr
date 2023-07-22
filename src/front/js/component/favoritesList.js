import React from "react";
import destinationSearch from "./destinationSearch";
// import destinationCard from"./"

// import  from "./" 

// function favoritesList({destinations, onFavoritedDestinations}) {
//     const destinationArray = destinations.map((destination) =>{
//         return <destinationCard
//             key={destination.id}
//             destination={destination}
//             onFavoritedDestinations={onFavoritedDestinations}
//         />
//     });

//     return();

// };
// function favoritesList({destination}){
//     const [searched, setSearched] = useState("");
//     const [favorite , setFavorite] = useState("");

//     const addToFavorite = id => {
//         if(!favorite.includes(id)) setFavorite(favorite.concat(id));
//         console.log(id);
//     };

//     const removeFavorite

// }

// export default favoritesList;




function favList({favorites, onDestinationFavorite}){
    const FavoritedDestination = favorites.filter((favorites) => (favorites.favorite))

    const favoriteDestination=FavoritedDestination.map((favorites) => (
        <destinationList
            key={favorites.id}
            favorite={favorites}
            onDestinationFavorite={onDestinationFavorite}
        />
    ))
    
    
    return(
        console.log("i am working favList function ")
        // {FavoritedDestination}
    
    );
    
}

export default favList;