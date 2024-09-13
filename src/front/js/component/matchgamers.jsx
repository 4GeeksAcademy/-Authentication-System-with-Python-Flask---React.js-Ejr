import React from "react";

export const MatchGamers = () => {
  return (
    <>
      <section className="py-5 bg-black">
        <div className="container rounded shadow">
          <div className="custom-bg-gamers">
            <h1 className="custom-title-2">Match Gamers</h1>
            <div className="row">
              <div className="col-lg-4">
                <div className="card border-card-match-gamers">
                  <img
                    src="https://via.placeholder.com/350"
                    className="card-img-top rounded"
                    alt="Main Image"
                  />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card custom-card mb-2 bg-black border-card-match-gamers">
                  <div className="row g-0 align-items-center ">
                    <div className="col-md-2 d-flex justify-content-start border-card-match-gamers">
                      <img
                        src="https://via.placeholder.com/75"
                        className="img-fluid rounded-circle my-2 m-5"
                        alt="Card 1 Image"
                      />
                    </div>
                    <div className="col-md-6 d-flex justify-content-start">
                      <div className="card-body">
                        <h5 className="card-title text-white">
                          @ Player Name 1
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end p-4">
                      <button className="btn custom-button-card-gamers">
                        ver perfil
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card custom-card mb-2 bg-black border-card-match-gamers">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-2 d-flex justify-content-start">
                      <img
                        src="https://via.placeholder.com/75"
                        className="img-fluid rounded-circle my-2 m-5"
                        alt="Card 2 Image"
                      />
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                      <div className="card-body">
                        <h5 className="card-title text-white">
                          {" "}
                          @ Player Name 2
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end p-4">
                      <button className="btn custom-button-card-gamers">
                        ver perfil
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card custom-card mb-2 bg-black border-card-match-gamers">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-2 d-flex justify-content-start">
                      <img
                        src="https://via.placeholder.com/75"
                        className="img-fluid rounded-circle my-2 m-5"
                        alt="Card 3 Image"
                      />
                    </div>
                    <div className="col-md-4 d-flex justify-content-center">
                      <div className="card-body">
                        <h5 className="card-title text-white">
                          {" "}
                          @ Player Name 3
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end p-4">
                      <button className="btn custom-button-card-gamers">
                        ver perfil
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card custom-card mb-2 bg-black border-card-match-gamers">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-2 d-flex justify-content-start">
                      <img
                        src="https://via.placeholder.com/75"
                        className="img-fluid rounded-circle my-2 m-5"
                        alt="Card 4 Image"
                      />
                    </div>
                    <div className="col-md-4 d-flex justify-content-start">
                      <div className="card-body">
                        <h5 className="card-title text-white">
                          @ Player Name 4
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end p-4">
                      <button className="btn custom-button-card-gamers">
                        ver perfil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
