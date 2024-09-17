import React from "react";
import "../../../styles/card_game.css"

export const CardGame = (props) => {
    return(
        <div className="row d-flex justify-content-center gallery">
            <div className="card col-6 col-sm-6 col-lg-4 m-4 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">Counter-Strike</p>
                </div>
            </div>
            <div className="card col-6 col-lg-3 m-4 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">Left 4 dead</p>
                </div>
            </div>
            <div className="card col-6 col-lg-3 m-4 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">God of War</p>
                </div>
            </div>        
            <div className="card col-6 col-lg-3 m-4 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">Card title</p>
                </div>
            </div>     
            <div className="card col-6 col-lg-3 m-4 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/b54/b54598d1d5cc31899f4f0a7e3122a7b0.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">Card title</p>
                </div>
            </div>  
            <div className="card col-6 col-lg-3 m-4 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/a5a/a5a7fb8d9cb8063a8b42ee002b410db6.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">Card title</p>
                </div>
            </div>    
        </div>
    )
}