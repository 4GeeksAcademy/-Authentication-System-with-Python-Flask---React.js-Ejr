import React from "react";
import { Link } from "react-router-dom";

export const KeeperForm = () => {
  return (
    <div className="container" id="calendar">
      <hr className="mt-4 mb-2" />
      <div className="row">
        <div className="col-auto">
          {/* Dos columnas principales */}
          <div style={{textAlign:"left"}}>
            <div className="d-block">
              <small>Service fee</small>
              <p>$15/hr</p>
            </div>
            <div>
              <form>
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Availability
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        calendar here
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div className="ml-auto mt-4">
        <Link to="/">
          <button className="btn btn-dark btn-lg" role="button">Book this keeper</button>
        </Link>
      </div>
    </div>
  );
};
