import React from "react";
import PropTypes from "prop-types";

function Modal(props) {
  return (
    <>
      <div
        className="modal fade modal-letter"
        id="programModal"
        tabIndex="-1"
        aria-labelledby="programModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="programModalLabel">
                {props.data.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{props.data.description}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#fbb" + 442 }}
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Modal;
Modal.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
};