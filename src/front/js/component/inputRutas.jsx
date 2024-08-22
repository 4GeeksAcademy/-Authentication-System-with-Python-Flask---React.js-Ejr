import React, { useState } from "react";

export const InputRutas = () => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Titulo"
                    aria-label="Titulo"
                    aria-describedby="basic-addon1"
                />
            </div>

            <div className="tags-container mb-3">
                {tags.map((tag, index) => (
                    <span key={index} className="tag-item">
                        #{tag}
                        <button
                            type="button"
                            className="btn-close ms-1"
                            aria-label="Remove"
                            onClick={() => handleRemoveTag(index)}
                        ></button>
                    </span>
                ))}
            </div>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a tag"
                    aria-label="Enter a tag"
                    aria-describedby="basic-addon2"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            
            <div className="mb-3">
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Escribe algo aquí..."
                ></textarea>
            </div>
        </div>
    );
};
