import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import logoImageUrl from "../../img/WordSword.png";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Footer } from "../component/footer";

export const Home = () => {
  const { store, actions } = useContext(Context);

  //variable for the text box that the user pastes in for our algorithm
  const [text, setText] = useState("");

  return (
    <div className="text-center">
      <div className="logo">
        <img src={logoImageUrl} className="homeLogo" />
      </div>
      {
        //conditionally render if user  is verfied
        !store.verifiedUser ? (
          <p className="titleP mb-5">
            {" "}
            Word sword is a webapp that can take long text documents, files, or
            pdfs and run them through our algorithm to conver them into concise
            summaries
          </p>
        ) : (
          <></>
        )
      }
      {
        //conditionally render if user  is verfied
        !store.verifiedUser ? (
          <p>
            Still dont have a WordSword account to save your work?{" "}
            <Link to="/create">Click here </Link>
            to get set up!
          </p>
        ) : (
          <></>
        )
      }
      <form>
        <label htmlFor="textFile">Choose a file:</label>
        <input
          type="file"
          id="textFile"
          name="textFile"
          accept=".txt, .pdf"
        ></input>
        <input
          type="submit"
          value="Slice File"
          onClick={() => {
            actions.setFile(textFile);
          }}
        />

        <label htmlFor="typedInput">Or copy and paste text here:</label>

        <textarea
          className="form-control w-50 mx-auto"
          name="typedInput"
          rows="10"
          cols="60"
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <input
          className="button-submit"
          type="submit"
          value="Slice Text"
          onClick={() => {
            //actions.setFile(typedInput)
            console.log(text);
          }}
        />
      </form>
      {/* <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div> */}
      {/* <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
          Read documentation
        </a>
      </p> */}
    </div>
  );
};
