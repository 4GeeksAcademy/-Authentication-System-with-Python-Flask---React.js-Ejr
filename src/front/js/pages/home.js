import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Row } from "react-bootstrap";
import "../../styles/home.scss";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <Container>
            <h1>Hola</h1>
        </Container>


        <Container>
            <Row>
                
                <Col xs={6} md={4}>
                    <Image src="https://images6.alphacoders.com/349/349908.jpg" thumbnail />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://images2.alphacoders.com/876/876244.jpg" thumbnail />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU" thumbnail />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://images8.alphacoders.com/503/thumb-1920-503131.jpg" thumbnail />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://kkinziger.files.wordpress.com/2014/08/8589130414963-grasshopper-cocktail-wallpaper-hd.jpg" thumbnail />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://www.wallpapers4u.org/wp-content/uploads/vodka_alcohol_cocktail_bottle_glass_5447_1920x1080.jpg" thumbnail />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://lh3.googleusercontent.com/proxy/VhePaqXfEvavwmpZ2R5jSBi81BZdP2AfaNtNAlX8ddUjYLd_MZcOkMHEVqW1qhfQAGHZYU_E4JB5nFMBAz8VK6mNeBojePiQd4QGBeeapLb2NpP9x11dwPO9" thumbnail />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://i.pinimg.com/originals/72/31/ee/7231ee17808ec6ddab1806870716a76c.jpg" thumbnail />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://www.wallpapertip.com/wmimgs/50-504541_best-cocktails.jpg" thumbnail />
                </Col>
            </Row>
        </Container>

     
	);
};
