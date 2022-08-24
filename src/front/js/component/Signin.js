import React, { useContext } from "react";
import { Context } from "../store/appContext";
import firebase from "firebase/compat/app";
import { auth } from "../pages/fire";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { store, actions } = useContext(Context);

  let navigate = useNavigate();
  let chatView = "/chat";

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    navigate(chatView);
    actions.handleLog();
  }

  return (
    <button className="btn btn-primary rounded-pill" onClick={signInWithGoogle}>
      Iniciar con Google
    </button>
  );
};

export default Signin;
