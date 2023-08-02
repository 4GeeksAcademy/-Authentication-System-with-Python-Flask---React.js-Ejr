import React, { useState, useEffect } from "react";
import "../../styles/DestinationSearch.css";

const MySearch = () => {
  const [search, setSearch] = useState("");
  const [destinationResult, setDestinationResult] = useState([]);
  const [weatherResult, setWeatherResult] = useState([]);
  const [flightResult, setFlightResult] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setError(null);
    setLoading(true);

    if (search !== "") {
      fetch(`https://api.teleport.org/api/cities/?search=${search}`)
        .then(response => response.json())
        .then(data => {
          setDestinationResult(data._embedded?.["city:search-results"]);
          setLoading(false);
        })
        .catch(error => {
          setError("Error fetching destination data. Please try again later.");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setDestinationResult([]);
    }
  }, [search]);

  useEffect(() => {
    if (destinationResult.length > 0) {
      const city = destinationResult[0].matching_full_name;

      fetch(`https://api.example.com/api/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
          setWeatherResult(data);
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
        });
    } else {
      setWeatherResult([]);
    }
  }, [destinationResult]);

  useEffect(() => {
    if (destinationResult.length > 0) {
      const city = destinationResult[0].matching_full_name;

      fetch(`https://api.example.com/api/flights?city=${city}`)
        .then(response => response.json())
        .then(data => {
          setFlightResult(data);
        })
        .catch(error => {
          console.error("Error fetching flight data:", error);
        });
    } else {
      setFlightResult([]);
    }
  }, [destinationResult]);

  const startSearch = (onKeyDownEvent) => {
    if (onKeyDownEvent.key === "Enter") {
      setSearch(input);
      setInput("");
    }
  };

  const addToFavorites = (destination) => {
    setFavorites([...favorites, destination]);
  };

  const removeFromFavorites = (destination) => {
    setFavorites(favorites.filter(fav => fav !== destination));
  };

  const isFavorite = (destination) => {
    return favorites.includes(destination);
  };

  const clearResults = () => {
    setDestinationResult([]);
    setWeatherResult([]);
    setFlightResult([]);
  };

  return (
    <div className="my-search-container">
      <div className="jumbotron">
        <h1>Vacation Destination Search</h1>
        <p>Your next vacation is just a search away!</p>
      </div>

      
      <input
        className="my-search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        id="searchInput"
        name="fname"
        onKeyDown={startSearch}
        placeholder="Where to?"
      />

      
      {loading ? <div className="loader">Loading...</div> : null}
      {error ? <div className="error-message">{error}</div> : null}

      
      {destinationResult.length > 0 ? (
        <div className="my-search-results">
          {destinationResult.map(city => (
            <div key={city._links["city:item"].href} className="my-search-result-item">
              <img src="https://png.pngtree.com/element_our/png/20180807/pngtree-pinmark-vacation-icon-and-concept-png-image_54653.jpg" alt="Vacation Destination Icon" className="vacation-icon" />
              style={{ width: "10px", height: "10px" }}
              <div className="city-info">
                <h3>{city.matching_full_name}</h3>
                <p>Country: {city.matching_alternate_names[0].name}</p>
                <button onClick={() => isFavorite(city.matching_full_name) ? removeFromFavorites(city.matching_full_name) : addToFavorites(city.matching_full_name)}>
                  {isFavorite(city.matching_full_name) ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results"></div>
      )}

      
      {weatherResult.length > 0 ? (
        <div className="my-weather-results">
          <h2>Weather Information</h2>
          {weatherResult.map((weather, index) => (
            <div key={index} className="weather-item">
              <p>Date: {weather.date}</p>
              <p>Temperature: {weather.temperature}</p>
              <p>Weather Condition: {weather.condition}</p>
              
            </div>
          ))}
        </div>
      ) : null}

      
      {flightResult.length > 0 ? (
        <div className="my-flight-results">
          <h2>Flight Prices</h2>
          {flightResult.map((flight, index) => (
            <div key={index} className="flight-item">
              <p>Flight Provider: {flight.provider}</p>
              <p>Price: {flight.price}</p>
              <p>Departure Date: {flight.departureDate}</p>
              
            </div>
          ))}
        </div>
      ) : null}

      
      <button className="clear-results-button" onClick={clearResults}>Clear Results</button>
    </div>
  );
};

export default MySearch;
