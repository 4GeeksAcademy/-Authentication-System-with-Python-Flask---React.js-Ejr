import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const FormReview = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({ title: "", comment_text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title.length >= 2 && formData.comment_text.length >= 10) {
      actions.create_review(formData);
      setFormData({ title: "", comment_text: "" });
    } else {
      alert("Please enter a title with at least two characters and a comment with at least ten characters.");
    }
  };

  return (
    <div className="div-form-review-content">
      <form className="form-review-content" onSubmit={handleSubmit}>
        <div className="title-form-review">
          <label htmlFor="title">Titutlo:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="comment-form-review">
          <label htmlFor="comment_text">Commentario:</label>
          <textarea
            rows="4"
            cols="30"
            maxLength="300"
            style={{ resize: "none" }}
            id="comment_text"
            name="comment_text"
            value={formData.comment_text}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
};

export default FormReview;
