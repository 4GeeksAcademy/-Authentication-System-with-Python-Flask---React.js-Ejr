import React, { useState, useEffect } from "react";
import "./DestinationSearch.css"; 

const MySearch = () => {
  const [search, setSearch] = useState([]);
  const [result, setResult] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    if (search !== "") {
      fetch("https://api.teleport.org/api/cities/?search=" + search)
        .then(response => response.json())
        .then(data => {
          setResult(data._embedded?.["city:search-results"]);
          setLoading(false);
        })
        .catch(error => {
          setError("Error fetching data. Please try again later.");
          setLoading(false);
        });
    } else {
      setLoading(false); 
      setResult([]); 
    }
  }, [search]);

  const startSearch = (onKeyDownEvent) => {
    if (onKeyDownEvent.key === "Enter") {
      setSearch(input);
      setInput("");
    }
  };

  const clearResults = () => {
    setResult([]);
  };

  return (
    <div className="my-search-container">
      <input
        className="my-search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        id="searchInput"
        name="fname"
        onKeyDown={startSearch}
        placeholder="Search for your vacation destination..."
      />
      {loading ? <div className="loader">Loading...</div> : null}
      {error ? <div className="error-message">{error}</div> : null}
      {result.length > 0 ? (
        <div className="my-search-results">
          {result.map(city => (
            <div key={city._links["city:item"].href} className="my-search-result-item">
              <img src="vacation-icon.png" alt="Vacation Destination Icon" className="vacation-icon" />
              <div className="city-info">
                <h3>{city.matching_full_name}</h3>
                <p>Country: {city.matching_alternate_names[0].name}</p>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">No results found.</div>
      )}
      <button className="clear-results-button" onClick={clearResults}>Clear Results</button>
    </div>
  );
};

export default MySearch;
