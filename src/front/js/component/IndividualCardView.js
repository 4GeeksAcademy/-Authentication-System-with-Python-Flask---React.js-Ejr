import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";


const GameCard = () => {
    const { id } = useParams()
    const { store, actions } = useContext(Context);
    const [currentGame, setCurrentGame] = useState(null)
    useEffect(() => {
        setCurrentGame(store.games[id])
    }, [])
    return (
        <>
            {currentGame ? (<div className="container-fluid d-flex flex-wrap justify-content-center gap-3">
                <h1>{currentGame?.title}</h1>
                <img
                    src={currentGame?.thumbnail}
                    className="card-img-top"
                    alt="..."
                />
                <p>{currentGame?.genre}</p>
                <p>{currentGame?.short_description}</p>
                <p>{currentGame?.release_date}</p>
                <p>{currentGame?.platform}</p>
                <p>{currentGame?.developer}</p>
                <p>{currentGame?.publisher}</p>
                <a>{currentGame?.game_url}</a>
            </div>) : (<div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>)}
        </>
    )
}
//         "id": 582,
// "title": "Tarisland",
// "thumbnail": "https:\/\/www.freetogame.com\/g\/582\/thumbnail.jpg",
// "short_description": "A cross-platform MMORPG developed by Level Infinite and Published by Tencent.",
// "game_url": "https:\/\/www.freetogame.com\/open\/tarisland",
// "genre": "MMORPG",
// "platform": "PC (Windows)",
// "publisher": "Tencent",
// "developer": "Level Infinite",
// "release_date": "2024-06-22",
// "freetogame_profile_url": "https:\/\/www.freetogame.com\/tarisland"
export default GameCard
