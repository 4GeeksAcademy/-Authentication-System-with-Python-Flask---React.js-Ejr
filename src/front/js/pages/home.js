import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="">
			<div className="container-fluid">
  				
				<div className="row">
    				<div className="col-md-12 text-center">
     			 		<h3 className="animate-charcter"> ArtSeekers</h3>
    				</div>
  				</div>

				<div className="row" id="about-us">
					<div className="info">
						<h2>About Us</h2>
					<p>Welcome to ArtSeekers, the digital sanctuary for art enthusiasts and connoisseurs alike. Our platform is more than just a gallery; it's a vibrant community where the masterpieces of the world are at your fingertips, waiting to be explored, rated, and favorited.</p>

<p>At ArtSeekers, we believe that art is a universal language that transcends boundaries and connects souls. That's why we've dedicated ourselves to creating an accessible space where the beauty and history of world-class art pieces can be shared and celebrated by everyone, from seasoned art historians to those just beginning their journey into the art world.</p>

<p>Our mission is to democratize the appreciation of art, making it possible for anyone, anywhere, to access, learn about, and engage with the finest artworks our history has to offer. Whether you're in search of inspiration, education, or just a moment of beauty, ArtSeekers provides a curated and user-friendly platform to satisfy your artistic cravings.</p>

<p>With ArtSeekers, you're not just browsing art; you're joining a global community of like-minded individuals who share your passion. Rate your favorite pieces to contribute to a growing database of community preferences, helping others discover and appreciate the art that moves you. Save your favorite artworks to your personal collection, creating a virtual gallery that reflects your unique taste and personality.</p>

<p>Our platform is built on the principle of interactive engagement, encouraging users to dive deeper into the stories behind each masterpiece, the lives of the artists, and the historical context that shaped their creation. By offering detailed descriptions, high-quality images, and expert insights, we strive to enhance your understanding and appreciation of each piece.</p>

<p>ArtSeekers is more than just a website; it's a journey through the annals of art history, a place to find inspiration, and a community where your passion for art is not just welcomed—it's celebrated. Join us in our quest to uncover the beauty and complexity of art from around the globe, one masterpiece at a time.</p>

					</div>
				</div>

				<div className="row" id="list">
					<h1 className="features">Features</h1>
				<div contenteditable>

  				<div className="line1">
					View world-class pieces of art
				</div>

  				<div className="line2">
    				Rate the pieces of art on a scale of 1-5 stars
  				</div>

				<div className="line3">
    				If you love a specific piece of art 'favorite' it and it will save to your profile
  				</div>

				<div className="line4">
    				Future iterations will recommend museums based on your ratings and favorites
  				</div>

				</div>

				</div>


			</div>
		</div>
	);
};
