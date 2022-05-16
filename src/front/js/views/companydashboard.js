import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const CompanyDashboard = () => {
  return (

<>
  {/* Hello world */}
  <div className="awesome" style={{ border: "1px solid red" }}>
    <label htmlFor="name">Enter your name: </label>
    <input type="text" id="name" />
  </div>
  <p>
    {/* Button to trigger modal */}
    <button
      className="btn btn-success btn-lg"
      data-toggle="modal"
      data-target="#modalForm"
    >
      Open Contact Form
    </button>
    {/* Modal */}
  </p>
  <div className="modal fade" id="modalForm" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
          <h4 className="modal-title" id="myModalLabel">
            Contact Form
          </h4>
        </div>
        {/* Modal Body */}
        <div className="modal-body">
          <p className="statusMsg" />
          <form role="form">
            <div className="form-group">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputMessage">Message</label>
              <textarea
                className="form-control"
                id="inputMessage"
                placeholder="Enter your message"
                defaultValue={""}
              />
            </div>
          </form>
        </div>
        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-default"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary submitBtn"
            onclick="submitContactForm()"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  </div>
  <p />
</>
  );
};
