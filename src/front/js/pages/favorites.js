import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../store/appContext";


export const FavoritesPage = () => {
  const { store, actions } = useContext(Context);
  // Usamos el hook useFavoritesContext para acceder al contexto de favoritos
  const { favorites } = store;

  return (
    <div>
      <h1>Mis favoritos</h1>
      <Row xs={1} md={4} className="g-5">
          {favorites.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </Row>
    </div>
  );
};
