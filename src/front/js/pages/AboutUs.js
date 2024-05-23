import React from "react";
import denis from "/src/front/img/denis.png";
import javier from "/src/front/img/javi.png";
import ernesto from "/src/front/img/ernesto.png";

const AboutUs = () => {
    return (
        <div className="about-us-page container">
            <section className="about-us-banner">
                <h1>Our Story</h1>
            </section>
            <section className="about-us-content">
                <p className="pb-4">
                    We are a company dedicated to urban exploration and adventure, with over 1 year of experience. We are passionate about uncovering the hidden gems of the city and we are committed to creating engaging, community-driven experiences.
                </p>
                <p className="pb-4">
                    At Urban Treasures, we believe in the power of discovery and community engagement. This guides us in everything we do, from organizing city-wide treasure hunts to fostering local cultural appreciation.
                </p>
            </section>
            <section className="about-us-team">
                <h2>Our Team</h2>
                <div className="team-members">
                    <div className="team-member">
                        <img className="members-image" src={ernesto} alt="Ernesto" />
                        <h3>Ernesto Pineda</h3>
                        <p>CEO</p>
                    </div>
                    <div className="team-member">
                        <img className="members-image" src={javier} alt="Javier" />
                        <h3>Javier García</h3>
                        <p>CEO</p>
                    </div>
                    <div className="team-member">
                        <img className="members-image" src={denis} alt="Denis Díaz" />
                        <h3>Denis Díaz</h3>
                        <p>CEO</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
