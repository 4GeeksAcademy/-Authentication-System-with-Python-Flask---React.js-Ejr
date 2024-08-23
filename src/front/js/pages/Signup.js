import React, { useContext, useState } from "react";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Signup = () => {
  const { storage, actions } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function submitForm(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("inputEmail");
    let password = formData.get("inputPassword");
    let name = formData.get("inputName");
    let phone_number = formData.get("inputPhone_number");
    let confirmPassword = formData.get("inputConfirmPassword");

    if (!email || !password || !name || !phone_number) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    let signedUp = await actions.signup(email, password, name, phone_number);
//------------------------------------------------------------------------------- manejo mails 
  const MailSender = () => {
    let email = formData.get("inputEmail");
    let name = formData.get("inputName");
    const data = {
      sender: {
        name: "AutoAgenda",
        email: "autoagenda3@gmail.com",
      },
      to: [
        {
          email: email,
          name: name,
        },
      ],
      subject: "Account created successfully",
      htmlContent: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Account Created</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #E3DDDB; margin: 0; padding: 0; text-align: center; color: #333333;">
    <div style="max-width: 600px; width: 100%; margin: 20px auto; padding: 20px; background-color: #F8F4F3;">
        <div style="text-align: center; padding: 20px 0;">
            <img src="https://img.mailinblue.com/7996011/images/content_library/original/66bcf74479b71d7506636d4a.png" alt="Logo" style="width: 120px; height: auto;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 20px 0 10px; color: #333333;">Account created successfully</h1>
        </div>
        <div style="text-align: left; padding: 0 20px; margin-top: 20px;">
            <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">Hello, <strong>${name}</strong></p>
            <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">Your Account on our website has been created successfully.</p>
            <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">This email is for informational purposes only, and you do not have to respond.</p>
        </div>
        <div style="margin-top: 30px; padding: 20px; font-size: 14px; color: #888888; text-align: center; background-color: #E3DDDB;">
            <p style="margin: 5px 0;"><strong>AutoAgenda | Drive Your Time</strong></p>
            <p style="margin: 5px 0;">&copy; 2024 All rights reserved</p>
            <div style="margin-top: 10px;">
                <a href="#" style="text-decoration: none; margin: 0 5px; color: #333333;">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #333333;">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                </a>
                <a href="#" style="text-decoration: none; margin: 0 5px; color: #333333;">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #333333;">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                </a>
                <a href="#" style="text-decoration: none; margin: 0 5px; color: #333333;">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                </a>
                <a href="#" style="text-decoration: none; margin: 0 5px; color: #333333;">
                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #333333;">
                        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                        <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</body>

</html>`,
    };

    // console.log("Data ready to send:", data);
    actions.SendMail(data);
  };

if (name && email) {
  MailSender();
} else {
  console.error("User Info is missing email or name.");
}



//------------------------------------------------------------------------------
    if (signedUp) navigate("/login");
  }

  return (
    <div id="content" className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header"><strong>Create a new account</strong></div>
          <div className="card-body">
            <form onSubmit={submitForm}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputName">Name</label>
                <input name="inputName" type="text" className="form-control" id="inputName" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputEmail">Email address</label>
                <input name="inputEmail" type="email" className="form-control" id="inputEmail" placeholder="Email" />
                <small id="emailHelp" className="form-text text-muted">We don't share your email with anyone</small>
              </div>
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputPhone_number">Phone Number</label>
                <input name="inputPhone_number" type="text" className="form-control" id="inputPhone_number" placeholder="Phone Number" />
              </div>
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputPassword">Password</label>
                <input name="inputPassword" type="password" className="form-control" id="inputPassword" placeholder="Enter Password" />
                <small id="passwordHelp" className="form-text text-muted">Your password is saved in encrypted form</small>
              </div>
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputConfirmPassword">Confirm Password</label>
                <input name="inputConfirmPassword" type="password" className="form-control" id="inputConfirmPassword" placeholder="Re-enter Password" />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
