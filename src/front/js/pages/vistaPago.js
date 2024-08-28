import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/vistaPago.css";

function VistaPago() {
  return (
<div className='Pago'>
<div className='pago__main-content'>
<div class="card container p-0 my-5">
      <div class="card-header">
        <h1>Información de Pago</h1>
      </div>
      <div class="card-body">
        <form class="row g-3">
          <div class="col-md-6">
              <label for="Card" class="form-label">Card #</label>
              <input type="text" placeholder="XXXXXXXXXXXX" class="form-control "/>
          </div>
          <div class="col-md-3">
            <label for="CVV" class="form-label">#CVV</label>
            <input type="text" placeholder="0000" class="form-control" id="inputCvv"/>
          </div>
          <div class="col-md-3">
            <label for="Amount" class="form-label">Amount</label>
            <div class="d-flex align-items-center">
                <i class="fa-solid fa-dollar-sign me-1"></i>
                <input type="text" class="form-control" id="inputAmount"/>
            </div>
          </div>
          <div class="col-md-6">
              <label for="name" class="form-label">First name</label>
              <input type="text" placeholder="Write your Firts name" class="form-control" id="inputName"/>
          </div>
          <div class="col-md-6">
            <label for="Amount" class="form-label">Last Name</label>
            <input type="text" placeholder="Write Your Last Name" class="form-control" id="inputAmount"/>
          </div>
          <div class="col-md-6">
          <label for="inputCity" class="form-label">City</label>
          <input type="text" class="form-control" id="inputCity"/>
          </div>
          <div class="col-md-6">
            <label for="selectState" class="form-label">State</label>
            <input type="text" class="form-select form-control" placeholder="Pick a State"/>
          </div>
          <div class="col-md-5">
            <label for="inputpostal" class="form-label">Postal Code</label>
            <input type="text" class="form-control" id="inputpostal"/>
          </div>
          <div class="col-md-6">
            <label class="form-label">We accept:</label>
            <div class="bg-secondary p-2 rounded col-6">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                    <label class="form-check-label" for="inlineRadio1"><i class="fa-brands fa-cc-visa"></i></label>
          </div>
          <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                <label class="form-check-label" for="inlineRadio2"><i
                          class="fa-brands fa-cc-mastercard"></i></label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
            <label class="form-check-label" for="inlineRadio3"><i
                    class="fa-brands fa-cc-paypal"></i></label>
          </div>
          <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
          <label class="form-check-label" for="inlineRadio3"><i
                  class="fa-brands fa-cc-diners-club"></i></label>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div class="card-footer text-end">
      <button type="button" class="btn btn-secondary">Close</button>
      <button type="button" class="btn btn-primary">Send</button>
  </div>
</div>
</div>
</div>
);
}

  export default VistaPago;