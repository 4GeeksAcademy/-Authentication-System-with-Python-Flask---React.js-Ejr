import React from "react";

const BookForm = () => {
  return (
    <div className="container d-flex">
      <div className="row">
        <div className="col-md-12 d-flex">
          <form className="form-control">
            <input type="text" className="form-group" />
            <input type="text" className="form-group" />
            <input type="text" className="form-group" />
            <input type="number" className="form-group" />
            <input type="text" className="form-group" />
            <input type="text" className="form-group" />
            <input type="file" className="form-group" />
          </form>
          <button className="btn btn-primary">upload</button>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
