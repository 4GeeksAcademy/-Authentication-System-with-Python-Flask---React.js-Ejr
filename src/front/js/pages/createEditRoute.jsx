import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import UploadFile from "../component/uploadFile.jsx";
import Accordion from "../component/accordion.jsx";
import { AddDay } from "../component/addDay.jsx";
import ActivityModal from "../component/activityModal.jsx";

export const CreateEditRoute = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="row w-100 justify-content-center">
        <UploadFile />
        <AddDay />
        {/* <ActivityModal /> */}
      </div>
    </>
  );
};