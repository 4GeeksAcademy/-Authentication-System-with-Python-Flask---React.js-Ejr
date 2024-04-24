import React from "react";

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
                        <img className="members-image" src="https://www.blixt.tv/wp-content/uploads/2018/10/Foto-para-empresas-06.jpg" alt="Ernesto" />
                        <h3>Ernesto Pineda</h3>
                        <p>CEO</p>
                    </div>
                    <div className="team-member">
                        <img className="members-image" src="https://media.istockphoto.com/id/640021202/es/foto/retrato-de-un-hombre-joven-alegre.jpg?s=612x612&w=0&k=20&c=55QWCFuSYNyRJUj10cCiOIqetLN8Ia4R8voI2vXtS5Q=" alt="Javier" />
                        <h3>Javier García</h3>
                        <p>CEO</p>
                    </div>
                    <div className="team-member">
                        <img className="members-image" src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1713965922/vvv_gfaxne.jpg" alt="Denis Díaz" />
                        <h3>Denis Díaz</h3>
                        <p>CEO</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
