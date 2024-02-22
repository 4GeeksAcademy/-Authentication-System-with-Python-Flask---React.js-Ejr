import React, { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (book) => {
    setFavorites([...favorites, book]);
  };

  return (
    <BookContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </BookContext.Provider>
  );
};
