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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdsyjmGLEYwnVqIZhcbjmtWjNtO0ogIORyCg&usqp=CAU"
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
                Meet the team that made this website possible.
              </p>
            </div>
          </div>

          <div className="row text-center">
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://ca.slack-edge.com/T0BFXMWMV-U04R98H6R54-1d0a9ef051e7-192"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Shaleena Evans</h5>
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
                  src="https://ca.slack-edge.com/T0BFXMWMV-U04TQCERBTJ-c4d74a95ae48-512"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Andres Medina</h5>
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
                  src="data:image/webp;base64,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"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Jonathan Shelley</h5>
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
                  src="https://ca.slack-edge.com/T0BFXMWMV-U04NQ1H6R35-63ae31448ac3-512"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">William Lebrun</h5>
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
