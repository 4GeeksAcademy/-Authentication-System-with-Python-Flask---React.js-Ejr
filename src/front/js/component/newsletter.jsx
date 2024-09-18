import React from "react";

export const NewsletterSection = () => {
  return (
    <>
      <section className="newsletter__section p-0 text-white py-5">
        <div className="container">
          <div className="row">
            <div className="newsletter__icon">
              <h1 className="newsletter__subtitle">Newsletter</h1>
            </div>
            <div className="col-md-8 d-flex align-items-center">
              <div className="newsletter__content">
                <h2 className="newsletter__title">
                  Subscribe to Receive The Latest News
                </h2>
              </div>
            </div>
            <div className="col-md-4">
              <form action="#" method="post" className="newsletter__form mt-4">
                <div className="input-group justify-content-center">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    aria-label="Email Address"
                  />
                  <button type="submit" className="btn">
                    Notify Me
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
