import React from "react";

export const PaymentForm = () => {
    return (
        <div className="card w-50 my-2">
            <div className="card-header fs-4 text-center">
                <b>Payment</b>
            </div>
            <div className="card-body">
                <form className="row g-3 p-3 align-items-end fw-semibold">
                    <div className="d-flex">
                        <div className="col-6 me-2">
                            <label htmlFor="inputFirstName" className="form-label">First Name</label>
                            <input type="text" id="inputFirstName" className="form-control" aria-label="Last Name"/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="inputLastName" className="form-label">Last Name</label>
                            <input type="text" id="inputLastName" className="form-control" aria-label="Last Name"/>
                        </div>
                    </div>
                    <div className="col-5"> 
                        <label htmlFor="inputPassword4" className="form-label">Card #</label>
                        <input type="password" id="inputPassword4" className="form-control" aria-describedby="passwordHelpBlock" placeholder="XXXXXXXXXXXXXXXX"/>
                    </div>
                    <div className="col-3">
                        <label htmlFor="inputPassword5" className="form-label">CVC #</label>
                        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" placeholder="0000"/>
                    </div>
                    <div className="col-4">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" className="form-control" id="amount" placeholder="Amount"/>
                    </div> 
                    <div className="col-6">
                        <div className="d-flex">
                            <fieldset className="form-label me-2" htmlFor="inlineRadioOptions">We accept:</fieldset>
                            <div className="bg-secondary rounded py-1 px-2 d-flex">
                                <div className="form-check form-control-sm">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                    <label className="form-check-label" htmlFor="inlineRadio1"><i className="fa-brands fa-cc-mastercard text-white"></i></label>
                                </div>
                                <div className="form-check form-control-sm">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                                    <label className="form-check-label" htmlFor="inlineRadio2"><i className="fa-brands fa-cc-visa text-white"></i></label>
                                </div>
                                <div className="form-check form-control-sm">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
                                    <label className="form-check-label" htmlFor="inlineRadio3"><i className="fa-brands fa-cc-diners-club text-white"></i></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="card-footer bg-body-secondary">
                <div className="d-grid gap-2 d-flex justify-content-center">
                    <button className="btn  btn-lg btn-secondary" type="button">Cancel</button>
                    <button className="btn btn-lg btn-success me-2" type="button">Pay</button>
                </div>
            </div>
        </div>
    );
};