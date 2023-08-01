import React from 'react';


const AboutPage = () => {
  return (
    <>

      <div className="bg-light">
        <div className="container py-5">
          <div className="row h-100 align-items-center py-5">
            <div className="col-lg-6">
              <h1 className="display-4">About us page</h1>
              <p className="lead text-muted mb-0">
                Find and compare cars you like! It makes it easier to purchase your next car with ease.
              </p>
              <p className="lead text-muted">
                Snippet by{' '}
                <a href="https://bootstrapious.com/snippets" className="text-muted">
                  <u>CarfindersUSA</u>
                </a>
              </p>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="https://file.kelleybluebookimages.com/kbb/base/evox/CP/52399/2023-Honda-CR-V-front_52399_032_1821x841_SX_cropped.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-5">
        <div className="container py-5">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 order-2 order-lg-1">
              <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
              <h2 className="font-weight-light">Lorem ipsum dolor sit amet</h2>
              <p className="font-italic text-muted mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">
                Learn More
              </a>
            </div>
            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5 px-5 mx-auto">
              <img
                src="https://bootstrapious.com/i/snippets/sn-about/img-2.jpg"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
            <div className="col-lg-6">
              <i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
              <h2 className="font-weight-light">Lorem ipsum dolor sit amet</h2>
              <p className="font-italic text-muted mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col-lg-5">
              <h2 className="display-4 font-weight-light">Our team</h2>
              <p className="font-italic text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>

          <div className="row text-center">
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Manuella Nevoresky</h5>
                <span className="small text-uppercase text-muted">CEO - Founder</span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}

            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Samuel Hardy</h5>
                <span className="small text-uppercase text-muted">CEO - Founder</span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}

            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Tom Sunderland</h5>
                <span className="small text-uppercase text-muted">CEO - Founder</span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}

            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">John Tarly</h5>
                <span className="small text-uppercase text-muted">CEO - Founder</span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}
          </div>
        </div>
      </div>

      <footer className="bg-light pb-5">
        <div className="container text-center">
          <p className="font-italic text-muted mb-0">
            &copy; Company.com All rights reserved.
          </p>
        </div>
      </footer>
    </>

  );
};

export default AboutPage;
