import React, { useState } from "react";

const UpdateProfileUser = ({ label, value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(fieldValue);
  };

  const handleChange = (e) => {
    setFieldValue(e.target.value);
  };

  return (
    <div>
      <label>{label}:</label>
      {isEditing ? (
        <div>
          <textarea value={fieldValue} onChange={handleChange} />
          <button onClick={handleSaveClick}>Valider</button>
        </div>
      ) : (
        <div>
          <p>{value}</p>
          <button onClick={handleEditClick}>Modifier</button>
        </div>
      )}
    </div>
  );
};

export default UpdateProfileUser;
