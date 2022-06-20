import React from "react";

export const IframeInstagram = ({ url }) => {
  return url ? <iframe src={`${url}` + "embed"} height={"600px"} /> : "";
};