import React from "react";
import { Context } from "../store/appContext";

export const BookSwapRequest = () => {
    return (
        <div className="book_request_swap">
          <div className="card" style={{ width: "25rem" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src="..." className="card-img-top" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-author">@username requested to swap BOOK TITLE for the DATE to the DATE.
                    Do you accept?</p>
                    <div className="mb-3 row">
                    <div className="col">
                      <div class="alert alert-info" role="alert">
                        Accept Swap Request
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col">
                      <div class="alert alert-info" role="alert">
                        Decline Swap Request
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}