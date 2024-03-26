import React, { useContext, createContext, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../store/appContext";

const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

export const FavoritesPage = () => {
  const { store, actions } = useContext(Context);
  // Usamos el hook useFavoritesContext para acceder al contexto de favoritos
  const { favorites } = store;
  const isLoggedIn = store.token !== null;

  useEffect(() => {
    actions.loadFavorites(store.token);
  }, [actions, store.token]);

  const addToFavorites = (book) => {
    actions.addToFavorites(book);
  };

  const removeFromFavorites = (bookKey) => {
    actions.removeFromFavorites(bookKey);
  };

  const isFavorite = (bookKey) => {
    return favorites.some((book) => book.key === bookKey);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, isLoggedIn }}>
      <div>
        <h1>Mis favoritos</h1>
        <Row xs={1} md={4} className="g-5">
          {favorites.map((book) => (
            <div key={book.key} book={book} />
          ))}
        </Row>
      </div>
    </FavoritesContext.Provider>
  );
};
