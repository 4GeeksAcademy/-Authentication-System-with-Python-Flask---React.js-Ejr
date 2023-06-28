import React from "react";
import "../../styles/InformationCard.css"



const InformationCard = () => {
    return (
        <>

        <div>
        <div className="card bg-dark text-white">
            <img src="https://uploads-ssl.webflow.com/632871e15b53a0140af28aeb/633b061d864ce251bb36073e_pexels-markus-spiske-1752757.jpg" className="card-img" alt="Stony Beach" />
            <div className="card-img-overlay d-flex flex-column justify-content-end">
                <h5 className="card-title">Basketball court "El Toñito"</h5>
                <p className="card-text">
                    Welcome to our sports center! You can rent a basketball court here and experience the thrill of the game. Grab your friends, shoot some hoops, and have a great time! Our court is top-notch with a wooden floor, proper markings, and sturdy baskets. Whether you're a seasoned player or just starting out, our court is perfect for some fun and active play. Book your slot now and enjoy the excitement of basketball!
                </p>
                
                <p className="card-text">Last updated 3 mins ago</p>
                <div>
        <button className="button-32">Rent Now</button>
        </div>
            </div>
        </div>
       
        </div>
        </>
    );
};

export default InformationCard;



