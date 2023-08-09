import React from "react";
import Navbar from "../component/Navbar.jsx";
// import Styles from "../views/styles/features.css"

const Feactures = () => {
    return (
        <div style={{backgroundColor: "black", color: "white"}}>
            <Navbar />
            <div className="features">
            <br/>
            <h1 style={{display: "flex", justifyContent: "center"}}>FUNCTIONS & STEPS</h1>
            <br/>
                <div className="card-group">
                    <div className="card" style={{backgroundColor: "black"}}>
                        <img src="https://images.unsplash.com/photo-1585692614093-62dab82e9d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" className="card-img-top" alt="..."/>
                        <figcaption>

                        </figcaption>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">CREATE YOUR ACCOUNT AND BECOME PART OF OUR FAMILY, YOU CAN BUY, HAVE YOUR LIST OF FAVORITES AND SEE YOUR OLD PURCHASES</p>
                            </div>
                    </div>
                    <div className="card" style={{backgroundColor: "black"}}>
                        <img src="https://images.unsplash.com/photo-1560390591-15ee5df86045?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTA4MDgyNnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">MAKE YOUR PURCHASE BY PAYING DIRECTLY WITH PAYPAL AND CONTACT US THROUGH OUR CUSTOMER SERVICE VIA WHATSAPP</p>
                            </div>
                    </div>
                    <div className="card"style={{backgroundColor: "black"}} >
                        <img src="https://images.unsplash.com/photo-1573666033935-0bf7bb387acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">AS A GUEST IN OUR APPLICATION YOU WILL BE ABLE TO NAVIGATE IN OUR DIFFERENT CATEGORIES AND KNOW IN DETAIL ABOUT THE CHARACTERISTICS OF EACH ARTICLE</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feactures;