import React, {useState} from "react";

function destinationSearch ({favorites, onDestinationFavorite}){

    // destructed the {favorites} prop
    const{id, favorite} = favorites

    // set state for favorite
    const [ isFavorited, setIsFavorited]= useState(favorite)

    // PATCH request function This request function was connected to an onClick event listener, the empty s icon was clicked/unclicked, the handleFavoriteChange function would run.
    const handleFavoritedChange =() => {
        setIsFavorited(isFavorited => !isFavorited)
        fetch(`https://bobo305-super-duper-space-palm-tree-j6xj5grxw4qc5w6-3001.preview.app.github.dev/favoritesList${id}`, {
        method: "PATCH" ,
        headers: {
            "Content_Type": "application/json"
        },
        body: JSON.stringify({favorite: !favorite})           
        })
            .then(response => response.json())
            //onDestinationFavorite callback function updates the DOM
            .then(updatedFavorite =>  onDestinationFavorite(updatedFavorite))
    }
    // render the destinationSearch
    return (
     <div>
         <div id="buttons">
            {isFavorited? (
                <div onClick={handleFavoritedChange}>
                // code for the empty favorite icon/button here 
                </div>
                 ) : (
                <div onClick={handleFavoritedChange}>
                // code for the filled  favorite icon/button here
                </div>    
                )}
        </div>
    </div>
    );  
}

export default destinationSearch;


