import React from "react";


export const MatchGame = () => {
    return(
        <div className="row gallery justify-content-center mt-2">
            <div className="card col-6 col-sm-6 col-lg-3 m-2 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">Counter-Strike</p>
                </div>
            </div>
            <div className="card col-6 col-lg-3 m-2 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">Left 4 dead</p>
                </div>
            </div>
            <div className="card col-6 col-lg-3 m-2 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">God of War</p>
                </div>
            </div>        
            <div className="card col-6 col-lg-3 m-2 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <img src="https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">Card title</p>
                </div>
            </div>     
            
            
        </div>
    )
}