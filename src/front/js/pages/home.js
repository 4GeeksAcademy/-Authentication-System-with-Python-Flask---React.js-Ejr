import React, { useContext } from "react";
//import { Context } from "../store/appContext";
import { Container, Row, Col, Image, Gallery, Item } from "react-bootstrap";
import "../../styles/home.scss";
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

export const Home = () => {
    //const { store, actions } = useContext(Context);

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Image src="https://images6.alphacoders.com/349/349908.jpg" thumbnail />
                </Col>
                <Col md={4}>
                    <Image src="https://images2.alphacoders.com/876/876244.jpg" thumbnail />
                </Col>
                <Col md={4}>
                    <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
                        thumbnail
                    />
                </Col>
                <Col md={4}>
                    <Image src="https://images8.alphacoders.com/503/thumb-1920-503131.jpg" thumbnail />
                </Col>
                <Col md={4}>
                    <Image
                        src="https://kkinziger.files.wordpress.com/2014/08/8589130414963-grasshopper-cocktail-wallpaper-hd.jpg"
                        thumbnail
                    />
                </Col>
                <Col md={4}>
                    <Image
                        src="https://www.wallpapers4u.org/wp-content/uploads/vodka_alcohol_cocktail_bottle_glass_5447_1920x1080.jpg"
                        thumbnail
                    />
                </Col>
                <Col md={4}>
                    <Image
                        src="https://lh3.googleusercontent.com/proxy/VhePaqXfEvavwmpZ2R5jSBi81BZdP2AfaNtNAlX8ddUjYLd_MZcOkMHEVqW1qhfQAGHZYU_E4JB5nFMBAz8VK6mNeBojePiQd4QGBeeapLb2NpP9x11dwPO9"
                        thumbnail
                    />
                </Col>
                <Col md={4}>
                    <Image
                        src="https://i.pinimg.com/originals/72/31/ee/7231ee17808ec6ddab1806870716a76c.jpg"
                        thumbnail
                    />
                </Col>
                <Col md={4}>
                    <Image src="https://www.wallpapertip.com/wmimgs/50-504541_best-cocktails.jpg" thumbnail />
                </Col>
                <Col md={4}>
                    <Image src="https://www.wallpapertip.com/wmimgs/50-504541_best-cocktails.jpg" thumbnail />
                </Col>
                <Col md={4}>
                    <Image src="https://images2.alphacoders.com/876/876244.jpg" thumbnail />
                </Col>
                <Col md={4}>
                    <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
                        thumbnail
                    />
                </Col>
            </Row>

            {/* CATEGORIAS */}
            {/* CATEGORIAS */}
            {/* CATEGORIAS */}
        </Container>

        <Container>
            const MyGallery = () => (
        <Gallery>
                <Item
                    original="https://images6.alphacoders.com/349/349908.jpg"
                    thumbnail="https://images2.alphacoders.com/876/876244.jpg"
                    width="1024"
                    height="768"
                >
                    {({ ref, open }) => (
                        <img ref={ref} onClick={open} src="https://images8.alphacoders.com/503/thumb-1920-503131.jpg" />
                    )}
                </Item>
                <Item
                    original="https://www.wallpapers4u.org/wp-content/uploads/vodka_alcohol_cocktail_bottle_glass_5447_1920x1080.jpg"
                    thumbnail="https://www.wallpapertip.com/wmimgs/50-504541_best-cocktails.jpg"
                    width="1024"
                    height="768"
                >
                    {({ ref, open }) => (
                        <img ref={ref} onClick={open} src="https://images2.alphacoders.com/876/876244.jpg" />
                    )}
                </Item>
            </Gallery>
)
        </Container>
	);
};

//Comentario
