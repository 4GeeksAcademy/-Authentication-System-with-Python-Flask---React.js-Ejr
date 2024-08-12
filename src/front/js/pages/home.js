import React from "react";
import "../../styles/home.css";
import Carousel from "../component/carousel";
import Jumbotron2 from "../component/jumbotron2";
import Card from "../component/card";
import Jumbotron from "../component/jumbotron";


export const Home = () => {
    return (
        <>
            <Jumbotron />
            <Carousel />
            <Jumbotron2 />
            <Card />
        </>
    );
};

export default Home;
