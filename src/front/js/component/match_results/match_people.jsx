import React from "react";

export const MatchPeople = () => {
    return (
        <div>
            <div className="w-100 border border-dark rounded">
                <div className="row">
                    <div className="col-2 text-center">
                        <img src="https://media.rawg.io/media/games/daa/daaee07fcb40744d90cf8142f94a241f.jpg" className="card-img-top rounded-circle" alt="..." style={{objectFit: "contain", width: "80px", height: "80px"}}/>    
                    </div>
                    <div className="col-6">
                        hola
                    </div>
                    <div className="col-4">
                        <button style={{backgroundColor: "#9B75F9", color: "white", border: "none", borderRadius: "20px",  fontSize: "16px", display: "block", width: "75%", marginBottom: "10px"}}>
                            Connect
                        </button>
                        <button style={{backgroundColor: "white", color: "#9B75F9", border: "2px solid #9B75F9", borderRadius: "20px", fontSize: "16px", display: "block", width: "75%"}}>
                            Profile
                        </button>
                    </div>
                </div>
            </div>            
        </div>        
    )
}