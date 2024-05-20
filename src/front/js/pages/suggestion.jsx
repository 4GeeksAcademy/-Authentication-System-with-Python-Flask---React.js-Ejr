import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const Suggestions = () => {
    const { store, actions } = useContext(Context);
    const [suggestionText, setSuggestionText] = useState("");

    useEffect(() => {
        actions.getSuggestions();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestionText.trim() === "") {
            return;
        }
        actions.createSuggestion(suggestionText);
        setSuggestionText("");
    };

    return (
        <div className="container">
            <h1>Suggestions from users111</h1>
            <ul className="list-group">
                {store.suggestions.map((suggestion, index) => (
                    <li key={index} className="list-group-item">
                        {suggestion.suggestion}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <label htmlFor="suggestion">New Suggestion:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="suggestion"
                        value={suggestionText}
                        onChange={(e) => setSuggestionText(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    Add Suggestion
                </button>
            </form>
        </div>
    );
};

export default Suggestions;