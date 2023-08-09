import React from "react";
import Navbar from "../component/Navbar.jsx";


const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <br />
            <p style={{display: "flex", justifyContent: "center"}}>LOCATION</p>
            <div className="container" style={{display: "flex", justifyContent: "center"}}>
                <br />
                <br />
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.1503171342606!2d-84.21425622425349!3d10.004439772956855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0f9bec89eb921%3A0x33be443103056771!2sCity%20Mall%20Alajuela!5e0!3m2!1sen!2scr!4v1691122448479!5m2!1sen!2scr" width="500" height="350" style={{border:"0", display: "flex", }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <br />
            <div className="card-group">
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Emmanuel Vargas</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a href="https://github.com/EmmanuelV22" target="_blank" rel="noopener noreferrer">
                            <p className="card-text"><small className="text-muted">https://github.com/EmmanuelV22</small></p>
                        </a>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Luis Vela</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <a href="https://github.com/luismvl" target="_blank" rel="noopener noreferrer">
                            <p className="card-text"><small className="text-muted">https://github.com/luismvl</small></p>
                        </a>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Julio Vargas</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        <a href="https://github.com/JulioV10" target="_blank" rel="noopener noreferrer">
                            <p className="card-text"><small className="text-muted">https://github.com/JulioV10</small></p>
                        </a>
                    </div>
                </div>
            </div>    </div>
    )
}

export default AboutUs;