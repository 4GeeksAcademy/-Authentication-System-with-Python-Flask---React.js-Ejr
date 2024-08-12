import React from "react";
import "../../styles/home.css";
import Carousel from "../component/carousel";
import Jumbotron2 from "../component/jumbotron2";
import Card from "../component/card";
import Jumbotron from "../component/jumbotron";
import Galery from "../component/galery";


export const Home = () => {
    return (
        <>
            <Jumbotron />
            <Galery/>
            <Carousel />
            <Jumbotron2 />
            <Card />
        </>
    );
};

export default Home;
