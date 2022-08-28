import React from "react";
import firebase from "firebase/compat/app";
import { auth } from "../pages/fire";

const Signin = () => {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button className="btn btn-primary" onClick={signInWithGoogle}>
      Iniciar chat con google
    </button>
  );
};

export default Signin;
