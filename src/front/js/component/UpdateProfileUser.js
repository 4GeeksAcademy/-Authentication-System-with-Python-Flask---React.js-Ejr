import React, { useState } from "react";

const UpdateProfileUser = ({ label, value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(fieldValue); // Appeler la fonction onSave avec la valeur mise à jour
  };

  const handleChange = (e) => {
    setFieldValue(e.target.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFieldValue(value);
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
            <div>
              <p>{value}</p>
              <button onClick={handleEditClick}>Modificar</button>
            </div>
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
