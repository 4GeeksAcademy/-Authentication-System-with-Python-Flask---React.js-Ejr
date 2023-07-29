import React, { useState } from "react";

const UpdateProfileUser = ({ label, value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(fieldValue); // Sauvegarder la nouvelle valeur lors de la validation.
  };

  const handleChange = (e) => {
    setFieldValue(e.target.value); // Mettre à jour la valeur du champ lorsque le texte change.
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFieldValue(value); // Rétablir la valeur d'origine lorsque l'édition est annulée.
  };

  return (
    <div>
      <label>{label}:</label>
      {label === "Firstname" || label === "Lastname" ? (
        <div>
          {isEditing ? (
            <div>
              <textarea value={fieldValue} onChange={handleChange} />
              <button onClick={handleSaveClick}>Validar</button>
              <button onClick={handleCancelClick}>Anular</button>
            </div>
          ) : (
            <p>{value}</p>
          )}
        </div>
      ) : isEditing ? (
        <div>
          <textarea value={fieldValue} onChange={handleChange} />
          <button onClick={handleSaveClick}>Validar</button>
          <button onClick={handleCancelClick}>Anular</button>
        </div>
      ) : (
        <div>
          <p>{value}</p>
          <button onClick={handleEditClick}>Modificar</button>
        </div>
      )}
    </div>
  );
};

export default UpdateProfileUser;
