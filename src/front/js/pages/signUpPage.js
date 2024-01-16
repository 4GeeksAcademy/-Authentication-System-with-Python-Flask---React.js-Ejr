import React from 'react';
import SignUpForm from '../component/signUpForm.js';
import '../../styles/authForms.css';

const SignUpPage = () => {
  return (
    <div className="form-container">
      <div className="page-title">SignUp</div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;