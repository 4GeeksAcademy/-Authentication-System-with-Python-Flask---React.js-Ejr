import React from "react";

const ImgUploaderWalk = () => {
  return (
    <form
      action="https://3001-ramsescode-doggerapp-nie3r5scykj.ws-us62.gitpod.io/walkers"
      encType="multipart/form-data"
      method="POST"
    >
      <input type="file" name="file" />
      <input type="submit" name="Upload a file" />
    </form>
  );
};

export default ImgUploaderWalk;
