import React, { useContext } from "react";
//import { Context } from "../store/appContext";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../../styles/home.scss";
import "photoswipe/dist/photoswipe.css";

export const Home = () => {
	return (
		<div className="row">
			<div className="column">
				<img src="https://images6.alphacoders.com/349/349908.jpg" />
				<img src="https://images2.alphacoders.com/876/876244.jpg" />
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU" />
				<img src="https://images8.alphacoders.com/503/thumb-1920-503131.jpg" />
				<img src="https://kkinziger.files.wordpress.com/2014/08/8589130414963-grasshopper-cocktail-wallpaper-hd.jpg" />
				<img src="https://www.wallpapers4u.org/wp-content/uploads/vodka_alcohol_cocktail_bottle_glass_5447_1920x1080.jpg" />
				<img src="https://i.pinimg.com/originals/72/31/ee/7231ee17808ec6ddab1806870716a76c.jpg" />
			</div>

			<div className="column">
				<img src="https://userscontent2.emaze.com/images/bae9a265-adcc-497e-92fc-528eea65f48b/513c19f09b5bfdc6fe34ded8d1865940.jpg" />
				<img src="https://lh3.googleusercontent.com/proxy/Uv8xP7YvXbrY1IUOhGP2xzkByq2_EqoTYKOO6oEEF8Wep-_120CdbwDTKT4MbY6UEwbLTmSuALc4YqR9toEfpTKXtjI5iA" />
				<img src="https://s2.best-wallpaper.net/wallpaper/2560x1440/1702/Fruit-drinks-cocktail-cold-glass-cups_2560x1440.jpg" />
				<img src="https://s2.best-wallpaper.net/wallpaper/2560x1600/1608/Two-cups-drinks-cocktail-strawberries_2560x1600.jpg" />
				<img src="https://www.barzone.co.uk/getasset/0429f8c0-492d-457c-9a02-10d48d9d2cf4/" />
				<img src="https://wallpapercave.com/wp/wp1887449.jpg" />
			</div>
		</div>
	);
};
