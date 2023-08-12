import React from 'react';

const DonationForm = () => {
  return (
    <div className='don'>
      <form action="https://www.sandbox.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="5TSUZQMBTAJYA" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.sandbox.paypal.com/en_AR/i/scr/pixel.gif" width="1" height="1" />
      </form>
    </div>

  );
};

export default DonationForm;