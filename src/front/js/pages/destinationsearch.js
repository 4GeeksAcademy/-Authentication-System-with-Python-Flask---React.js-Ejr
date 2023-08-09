import React, { useState, useEffect } from "react";
import "../../styles/DestinationSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
const MySearch = () => {
  const [search, setSearch] = useState("");
  const [destinationResult, setDestinationResult] = useState([]);
  const [flightResult, setFlightResult] = useState([]);
  const [airportResult, setAirportResult] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchCities = async () => {
      if (search !== "") {
        try {
          const response = await fetch(`https://api.teleport.org/api/cities/?search=${search}`);
          const data = await response.json();
          console.log("cities", data);
          setLoading(false);
          return data._embedded?.["city:search-results"];
        } catch (error) {
          setError("Error fetching destination data. Please try again later.");
          setLoading(false);
        }
      }
    };
    const fetchAirports = async (city) => {
      const url = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${city}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '26417e7137msh4d7acb99d1bc795p134430jsn57e3f84c008c',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("airports", result.data);
        return result.data;
      } catch (error) {
        console.error(error);
      }
    };
    const fetchFlights = async (airport) => {
      const date = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
      const url = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=MIA&destinationAirportCode=${airport}&date=${date}&itineraryType=ONE_WAY&sortOrder=ML_BEST_VALUE&numAdults=1&numSeniors=0&classOfService=ECONOMY&pageNumber=1&currencyCode=USD`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '26417e7137msh4d7acb99d1bc795p134430jsn57e3f84c008c',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data.flights, "flights");
        return result.data.flight;
      } catch (error) {
        console.error(error);
      }
    };
    const fetchBoth = async () => {
      const cities = await fetchCities();
      if (cities && cities.length > 0) {
        const destination = cities[0].matching_full_name;
        const wholeLocationName = destination.split(", ");
        const city = wholeLocationName[0];
        const airports = await fetchAirports(city);
          const airport = airports[0].airportCode;
          console.log(airports, "here");
          const flights = await fetchFlights(airport);
          // console.log(flights, "flights")
          setDestinationResult(cities);
          setAirportResult(airports);
          setFlightResult(flights);
      }
    };
    fetchBoth();
  }, [search]);
  // useEffect(() => {
  //     fetch(`https://api.teleport.org/api/cities/?search=${search}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("cities", data);
  //         setDestinationResult(data._embedded?.["city:search-results"]);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         setError("Error fetching destination data. Please try again later.");
  //         setLoading(false);
  //       });
  //     const result = destinationResult[0].matching_full_name;
  //     const all = result.split(", ");
  //     const city = all[0];
  //     const flightUrl = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${city}`;
  //     const flightOptions = {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': '26417e7137msh4d7acb99d1bc795p134430jsn57e3f84c008c',
  //         'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
  //       }
  //     };
  //     fetch(flightUrl, flightOptions)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("flights", data);
  //         setFlightResult(data);
  //       })
  //       .catch((error) => {
  //         setError("Error fetching flight data. Please try again later.");
  //       });
  //   } else {
  //     setLoading(false);
  //     setDestinationResult([]);
  //   }
  // }, [search]);
  // useEffect(() => {
  //   if (destinationResult.length > 0) {
  // }, [destinationResult]);
  const startSearch = (event) => {
    event.preventDefault();
    setSearch(input);
    setInput("");
  };
  const addToFavorites = (destination) => {
    setFavorites([...favorites, destination]);
  };
  const removeFromFavorites = (destination) => {
    setFavorites(favorites.filter((fav) => fav !== destination));
  };
  const isFavorite = (destination) => {
    return favorites.includes(destination);
  };
  const clearResults = () => {
    setDestinationResult([]);
    setFlightResult([]);
  };
  return (
    <div className="my-search-container">
      <div className="jumbotron">
        <h1>It's Time To Get Away</h1>
        <p>Where Do You Want To Go!</p>
      </div>
      <form onSubmit={startSearch} className="form-inline my-search-form">
        <div className="input-group">
          <input
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            id="searchInput"
            name="fname"
            placeholder="Your Next Destination"
            aria-label="Destination"
            required
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
      {loading ? <div className="loader">Loading...</div> : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="my-results-container">
        {destinationResult.length > 0 ? (
          <div className="my-search-results">
            {destinationResult.map((city) => (
              <div
                key={city._links["city:item"].href}
                className="card my-search-result-item"
              >
                <div className="card-body">
                  <h3 className="card-title">{city.matching_full_name}</h3>
                  <p className="card-text">{city.matching_alternate_names.name}</p>
                  <button
                    className={`btn ${isFavorite(city.matching_full_name) ? "btn-danger" : "btn-outline-danger"
                      }`}
                    onClick={() =>
                      isFavorite(city.matching_full_name)
                        ? removeFromFavorites(city.matching_full_name)
                        : addToFavorites(city.matching_full_name)
                    }
                  >
                    {isFavorite(city.matching_full_name) ? (
                      <i className="fas fa-heart"></i>
                    ) : (
                      <i className="far fa-heart"></i>
                    )}
                  </button>
                </div>
              </div>
            ))}
            <div className="my-flight-results">
              <h2>Flight Prices</h2>
              {console.log(flightResult)}
              {/* {flightResult.map((flight, index) => (
              <div key={index} className="card flight-item">
                <div className="card-body">
                  <p>Flight Provider: {flight.provider}</p>
                  <p>Price: {flight.price}</p>
                  <p>Departure Date: {flight.departureDate}</p>
                </div>
              </div>
            ))}  */}
            </div>
          </div>
        ) : (
          <div className="alert alert-info">No results found.</div>
        )}
      </div>
      <button className="btn btn-secondary" onClick={clearResults}>
        Clear Results
      </button>
    </div>
  );
};
export default MySearch;




