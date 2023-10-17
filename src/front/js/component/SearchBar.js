import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"

export const SearchBar = () => {
    const [input, setInput] = useState("")

    const fetchData = (value) => {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.BOOK_API_KEY}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
            });
    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)}></input>
        </div>
    )
}